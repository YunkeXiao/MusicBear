const express = require('express');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const bodyParser = require('body-parser');
const cors = require('cors');
const assert = require('assert');
const util = require('util');
const setIntervalPromise = util.promisify(setInterval);
const updatemodule = require("./update.js");
const MongoClient = require('mongodb').MongoClient;
const mongo = require('mongodb');
const mongoose = require('mongoose');
const dbName = 'heroku_wlmwvdfs';
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.static(path.join(__dirname, "client", "build")));
let xhr = new XMLHttpRequest();
let update = new updatemodule();

const KEY = process.env.KEY; //API Key
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const client = new MongoClient(MONGODB_URI);

console.log(KEY);
console.log(MONGODB_URI);
console.log(PORT);


setIntervalPromise(function(){update()}, 3600000)
    // .then(data => console.log(data))
    // .catch(err => console.error(`[Error]: ${err}`));

const findtopArtists = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('topArtists');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    callback(docs);
  });
}

const findArtist = function(db, artist, callback) {
  // Get the documents collection
  const collection = db.collection('topArtists');
  // console.log(collection.find()+"==============================");
  // Find some documents
  collection.find({'name': artist}).toArray(function(err, docs) {
    // console.log(docs);
    callback(docs);
  });
}

const findUser = function(db, user, callback) {
  // Get the documents collection
  const collection = db.collection('users');
  // Find some documents
  collection.find({'username': user}).next(function(err, docs) {
    console.log(docs==null);
    callback(docs);
  });
}
// client.connect(function(err) {
//   assert.equal(null, err);
//   const db = client.db(dbName);
//   var user = findUser(db, 'ynke', function() {
//       client.close();
//   });
// });
// const client = new MongoClient(dbURL);
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("MongoDB Connected...");
//
//   const db = client.db(dbName);
//
//   insertDocuments(db, function() {
//     client.close();
//   });
// });
//

// mongoose
//     .connect(db)
//     .then(() => console.log("MongoDB Connected..."))
//     .catch((err => console.log(err)));
//
// const artistSchema = new Schema({
//     name
// })
// mongoose.model("artist", artistSchema)

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Enables CORS
app.use(cors({credentials: true, origin: true}));

// Get top artists' name and listenercount <-- PETER REPLACE THIS WITH MONGODB DATABASE
// let topArtists = [];
// let maxPage = 4;
// for (let page = 1; page <= maxPage; page++) {
    // let url = "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=" +
    //     key + "&format=json&limit=50&page=" + page;
//     xhr.open("GET", url, false);
//     xhr.onload = function () {
//         let json = JSON.parse(this.responseText);
//         json['artists']['artist'].forEach((item) => {
//             topArtists.push({name: item.name.toLowerCase(), listeners: item.listeners})
//         });
//     };
//     xhr.send();
// }

// API for artists
app.get('/api/artistlist', (req, res) => {
    client.connect(function(err) {
      assert.equal(null, err);
      const db = client.db(dbName);
      findtopArtists(db, function(topArtists) {
          res.send(topArtists);
          client.close();
      });
    });
});

// Hashing algorithm for password
String.prototype.hashCode = function () {
    let hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

// TEMPORARY USERBASE <-- PETER, REPLACE THIS WITH MONGODB DATABASE
// let users = [{'username': 'yunke', 'password': '-383459980'}]; //password: xiao

// Manage POST requests for new users
// BUGS: Any post request after the first one crashes. The request body is empty for some reason.
app.post('/api/users', (req, res) => {
    // console.log(req);
    //Checks if username already exists
    // var user;

    client.connect(function(err) {
      assert.equal(null, err);
      const db = client.db(dbName);
      findUser(db, req.body.username, function(user) {
          if (user===null){
              let user = {'username': req.body.username, 'password': req.body.password.hashCode().toString()};
              res.json({'username': req.body.username, 'password': req.body.password, 'error': '0'});

              assert.equal(null, err);
              const db = client.db(dbName);
              db.collection('users').insertOne(user, function(err) {
                  assert.equal(null, err);
                  client.close();
              });

          } else {
              res.json({'username': req.body.username, 'password': req.body.password, 'error': '1'});
          }
          client.close();
      });
    });

    // if (user===null){
    //     let user = {'username': req.body.username, 'password': req.body.password.hashCode().toString()};
    //     res.json({'username': req.body.username, 'password': req.body.password, 'error': '0'});
    //     client.connect(function(err) {
    //         assert.equal(null, err);
    //         const db = client.db(dbName);
    //         db.collection('users').insertOne(user, function(err) {
    //             assert.equal(null, err);
    //             client.close();
    //         });
    //     });
    // } else {
    //     res.json({'username': req.body.username, 'password': req.body.password, 'error': '1'});
    // }
    // client.close();
});

// Manage sign in process
app.get('/api/users', (req, res) => {
    let password = req.query.password;
    let username = req.query.username;
    console.log(req.query, req.query.password)
    // let user;
    // for (let item of users) {
    //     if (item.username === username) {
    //         user = item;
    //         break;
    //     }
    // }
    client.connect(function(err) {
      assert.equal(null, err);
      const db = client.db(dbName);
      user = findUser(db, username, function(user) {
          client.close();
          res.json({'answer': (user !== null && password.hashCode().toString() === user.password).toString()})

      });
    });
    // answer = true when user exists and password matches, false otherwise
    // res.json({'answer': (user !== null && password.hashCode().toString() === user.password).toString()})
});

// Manage user searches
app.get('/api/artists', (req, res) => {
   //  console.log(req.query);
   // // search = search.toLowerCase().replace('+', ' ');
   //  MongoClient.connect("mongodb://music:bear@localhost/topArtists", function(err, db) {
   //      let artistList = [];
   //      let search = (req.query.search).toString().toLowerCase().replace('+', ' ');
   //      assert.equal(null, err);
   //      console.log(db);
   //      db.topArtists.find(search).toArray( function(artists) {
   //          array.forEach(function(artist) {
   //              artistList.push(artist.name);
   //          });
   //          res.json(artistList);
   //          db.close();
   //      });
   //  });
    let search = (req.query.search).toString().toLowerCase().replace('+', ' ');
    client.connect(function(err) {
      assert.equal(null, err);
      const db = client.db(dbName);
      findArtist(db, search, function(artists) {

          res.json(artists.slice(-8, artists.length));
          client.close();
      });
    });
});

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "public", "index.html"));
});
app.listen(PORT, () => `Server running on port ${PORT}`);
