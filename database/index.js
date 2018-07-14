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

var addSimilar = function(callback, data) {
  connection.query(`INSERT INTO similar (artist_id, similar_id) VALUES ((SELECT id FROM artist WHERE name=?), (SELECT id FROM artist WHERE name=?))`, data, function(err, results, fields) {
    if  (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};
// insert into similar (artist_id, similar_id) VALUES ((SELECT id from artist where name='Justin Vernon'), (select id from artist where name='Fleet Foxes'));

module.exports.selectAll = selectAll;
module.exports.insert = insert;
module.exports.findDuplicateArtist = findDuplicateArtist;
module.exports.update = update;
module.exports.addSimilar = addSimilar;
