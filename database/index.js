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

var selectAll = function(callback, table) {
  connection.query(`SELECT * FROM ?`, [table], function(err, results, fields) {
    if  (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var findDuplicateArtist = function(callback, table, artist) {
  console.log(table, artist)
  connection.query(`SELECT * FROM ${table} WHERE name = ?`, [artist], function(err, results, fields) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, results)
    }
  });
}

var insert = function(callback, table, data) {
  connection.query(`INSERT INTO ${table} SET ?`, data, function(err, results, fields) {
    if  (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var update = function(callback, table, data) {
  connection.query(`UPDATE ${table} SET ? WHERE name = ?`, data, function(err, results, fields) {
    if  (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};



module.exports.selectAll = selectAll;
module.exports.insert = insert;
module.exports.findDuplicateArtist = findDuplicateArtist;
module.exports.update = update;
