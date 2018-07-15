const express = require('express');
const bodyParse = require('body-parser');
const request = require('request');
const db = require('../database');
const helpers = require('../helpers');

var PORT = process.env.PORT || 3000
const app = express()

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
    const artists = JSON.parse(body).similarartists.artist

    if (!artists) res.end()

    db.addArtist(artistName)
    artists.forEach((artist) => {
      db.addArtist(artist.name)
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

app.get('/testings', (req, res) => {
   db.findDuplicateArtist('artist', 'Bon Iver').then((data)=>{console.log(data)})
  res.end();
})

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}!`);
});
