const express = require('express');
const bodyParse = require('body-parser')
const PORT = process.env.PORT;
const app = express()

app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../node_modules'));

app.listen(PORT, function() {
  console.log('listening on port 3000!');
});
