const express = require('express');
const bodyParse = require('body-parser');
const request = require('request');
const db = require('../database')
var PORT = process.env.PORT || 3000
const app = express()
app.use(function(req, res, next) {
  res.set("Access-Control-Allow-Origin", "*")
  next()
});

// app.set('port', PORT || 3000);
app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../node_modules'));


app.use('/search', function(req, res){
  request( {
    url: 'http://ws.audioscrobbler.com/2.0/',
    type: 'GET',
    qs: {
    method: 'artist.getsimilar',
    artist: req.query.body,
    api_key: '04c96ec32bbace5646ad77d7c171ae4a' ,
    format: 'json'
  },
    headers: {
      "Content-Type": "application/json"
    }
 }, function(err, response, body){
   if (err) {
     throw err
   }
   res.set('Content-Type', 'application/json')
   var parsedBody = JSON.parse(body)
   res.end(body)
 })
})

app.use('/details', function(req, res){
  request( {
    url: 'http://ws.audioscrobbler.com/2.0/',
    type: 'GET',
    qs: {
    method: 'artist.getInfo',
    artist: req.query.body,
    api_key: '04c96ec32bbace5646ad77d7c171ae4a' ,
    format: 'json'
  },
    headers: {
      "Content-Type": "application/json"
    }
 }, function(err, response, body){
   if (err) {
     throw err
   }
   res.set('Content-Type', 'application/json')
   res.end(body)
 })
})

app.use('/db', function(req, res){
  db.selectAll((data)=>{console.log(data)})
  console.log('hello')
  res.end()
});

app.listen(PORT, function() {
  console.log('listening on port 3000!');
});
