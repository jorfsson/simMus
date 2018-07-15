var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '!Srekwah1',
  socketPath: '/var/run/mysqld/mysqld.sock',
  database: 'artists'
});

connection.connect(function(err) {
  if (err) { throw err } else { console.log('connected') }
});

const selectAll = (table) =>
  new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, results) => {
      if (err) { reject(err) } else { resolve(results) }
    });
  });

const findDuplicateArtist = (table, artist) =>
  new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE name = ?`, [artist], (err, results) => {
      if (err) { reject(err) } else { resolve(results) }
    });
  })

const insert = (table, data) =>
  new Promise ((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, results) => {
      if (err) { reject(err) } else { resolve(results) }
    });
  });

const update = (table, data) =>
  new Promise ((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE name = ?`, data, (err, results) => {
      if (err) { reject(err) } else { resolve(results) }
    });
  })

const addSimilar = (callback, data) =>
  new Promise ((resolve, reject) => {
    connection.query(`INSERT INTO similar (artist_id, similar_id) VALUES ((SELECT id FROM artist WHERE name=?), (SELECT id FROM artist WHERE name=?))`, data, (err, results) => {
      if (err) { reject(err) } else { resolve(results) }
    });
  });

const addArtist = (artistName) => {
  findDuplicateArtist('artist', artistName)
  .then((data) => {
    if (data.length === 0) {
      insert('artist', {name: artistName}).then((data) => {console.log(data)})
    } else { console.log('Already exists in database')}
  }).catch((err) => {console.log(err)})
}

module.exports.selectAll = selectAll;
module.exports.insert = insert;
module.exports.findDuplicateArtist = findDuplicateArtist;
module.exports.update = update;
module.exports.addSimilar = addSimilar;
module.exports.addArtist = addArtist;
