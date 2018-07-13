const express = require('express');
const bodyParse = require('body-parser')
const app = express()

app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../node_modules'));

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
