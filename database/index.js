var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '!Srekwah1',
  socketPath: '/var/run/mysqld/mysqld.sock',
  database: 'artists'
});

connection.connect(function(err) {
  if (err) {
    throw err
  } else {
    console.log('connected')
  }
});

var selectAll = function(callback) {
  connection.query('SELECT * FROM artist', function(err, results, fields) {
    if  (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};
selectAll((err, data)=>{console.log(data)})

module.exports.selectAll = selectAll;
