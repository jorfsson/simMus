const express = require('express');
const bodyParse = require('body-parser');
const path = require('path')
const request = require('request');
const db = require('../database');
const helpers = require('../helpers');

const app = express()

var PORT = process.env.PORT || 3000

app.use(function(req, res, next) {
  res.set("Access-Control-Allow-Origin", "*")
  next()
});

app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../node_modules'));

app.use('/search', function(req, res){
  var artistName = req.query.body;
  request({
    url: 'http://ws.audioscrobbler.com/2.0/',
    type: 'GET',
    qs: {
      method: 'artist.getsimilar',
      artist: artistName,
      api_key: '04c96ec32bbace5646ad77d7c171ae4a' ,
      format: 'json'
    },
    headers: {
      "Content-Type": "application/json"
    }
  }, (err, response, body) => {
    if (err) throw err;
    let json = JSON.parse(body)
    if (json.similarartists === undefined) {
      res.end()
    }

    const artists = json.similarartists.artist

    db.addArtist(artistName)
    artists.forEach((artist) => {
      db.addArtist(artist.name);
      db.addSimilar([artistName, artist.name]);
    });
   res.end(body);
 })
})

app.use('/details', function(req, res){
  var artistName = req.query.body;
  request({
    url: 'http://ws.audioscrobbler.com/2.0/',
    type: 'GET',
    qs: {
    method: 'artist.getInfo',
    artist: artistName,
    api_key: '04c96ec32bbace5646ad77d7c171ae4a' ,
    format: 'json'
  },
    headers: {
      "Content-Type": "application/json"
    }
  }, (err, response, body) => {
    if (err) throw err;

    const artist = JSON.parse(body).artist;

    const sql = [{
        image: artist.image[3]['#text'],
        summary: helpers.summarizer(artist.bio.summary),
        url: artist.bio,
        listeners: artist.stats.listeners,
        playcount: artist.stats.playcount
      }, artist.name]

    db.update('artist', sql);
    res.end(body)
  })
})

app.use('/nodes', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/templates/node.html'))
})

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}!`);
});
