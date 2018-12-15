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
// app.use(express.static(path.join(__dirname, "client", "build")));
let xhr = new XMLHttpRequest();
let update = new updatemodule();

// Zhiding
const key = process.env.KEY; //API key
const mongodb_uri = process.env.MONGODB_URI;
const port = process.env.PORT;
const client = new MongoClient(mongodb_uri);
console.log("<ENV>");
console.log("key " + key);
console.log("mongodb_uri " + mongodb_uri);
console.log("port " +port);
console.log("</ENV>");

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

const findArtist = function(db, name, callback) {
  // Get the documents collection
  const collection = db.collection('topArtists');
  // console.log(collection.find()+"==============================");
  // Find some documents
  collection.find({'name': {$regex: `${name}`, $options:"i"}}).toArray(function(err, docs) {
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

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Enables CORS
app.use(cors({credentials: true, origin: true}));

// API for artists
app.get('/api/artistlist', (req, res) => {
    client.connect(function(err) {
      assert.equal(null, err);
      const db = client.db(dbName);
      findtopArtists(db, function(topArtists) {
          res.send(topArtists);
      });
    });
});

// Yunke
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

// Zhiding

app.post('/api/users', (req, res) => {
    console.log(req.body);
    //Checks if username already exists
    // var user;
    console.log("-----------------------------------");
    console.log(req.body);
    client.connect(function(err) {
      assert.equal(null, err);
      const db = client.db(dbName);
      findUser(db, req.body.username, function(user) {
          console.log("user = " + user);
          if (user===null){
              let user = {'username': req.body.username.hashCode().toString(), 'password': req.body.password.hashCode().toString()};
              res.json({'username': req.body.username, 'password': req.body.password, 'error': '0'});

              assert.equal(null, err);
              const db = client.db(dbName);
              db.collection('users').insertOne(user, function(err) {
                  assert.equal(null, err);
              });

          } else {
              res.json({'username': req.body.username, 'password': req.body.password, 'error': '1'});
          }
      });
    });
});

// Manage sign in process
app.get('/api/users', (req, res) => {

    let password = req.query.password;
    let username = req.query.username.hashCode().toString();

    client.connect(function(err) {
      assert.equal(null, err);
      const db = client.db(dbName);
      user = findUser(db, username, function(user) {
          res.json({'answer': (user !== null && password.hashCode().toString() === user.password).toString()})

      });
    });
    // answer = true when user exists and password matches, false otherwise
    // res.json({'answer': (user !== null && password.hashCode().toString() === user.password).toString()})
});

// TECHNOLOGY : PULL
// Manage user searches
app.get('/api/artists', (req, res) => {
   //  console.log(req.query);

    let search = (req.query.search).toString().toLowerCase().replace('+', ' ');
    client.connect(function(err) {
      assert.equal(null, err);
      const db = client.db(dbName);
      findArtist(db, search, function(artists) {

          res.json(artists);
      });
    });
});

// Server static assets if in production

if(process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

console.log("====================================================================")
app.listen(port, () => `Server running on port ${port}`);
console.log("====================================================================")
