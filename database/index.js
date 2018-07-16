var mysql = require('pg');

var newsql = new mysql.Client
var connection = newsql.connect(
'postgres://auveunhkxoqjlx:d0dc24109a6d93a5fd01fd60bf54467425b7277576056f860ff0ef2a4ef1b4bb@ec2-54-227-240-7.compute-1.amazonaws.com:5432/d2tbdogc0lfloc'
);

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

const addSimilar = (data) =>
  new Promise ((resolve, reject) => {
    connection.query(`INSERT INTO similar (artist_id, similar_id) VALUES ((SELECT id FROM artist WHERE name=?), (SELECT id FROM artist WHERE name=?))`, data, (err, results) => {
      if (err) { reject(err) } else { resolve(results) }
    });
  });

const checkID = (data) =>
  new Promise ((resolve, reject) => {
    connection.query(`SELECT similar. FROM similar INNER JOIN artist ON ?))`, data, (err, results) => {
      if (err) { reject(err) } else { resolve(results) }
    });
  });


const addArtist = (artistName) =>
  findDuplicateArtist('artist', artistName)
  .then((data) => {
    if (data.length === 0) {
      insert('artist', {name: artistName}).then((data) => {console.log(data)})
    } else { console.log('Already exists in database')}
  }).catch((err) => {console.log(err)})


module.exports.selectAll = selectAll;
module.exports.insert = insert;
module.exports.findDuplicateArtist = findDuplicateArtist;
module.exports.update = update;
module.exports.addSimilar = addSimilar;
module.exports.addArtist = addArtist;
