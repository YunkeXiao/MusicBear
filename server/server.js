const express = require('express');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const bodyParser = require('body-parser');
const cors = require('cors');
const assert = require('assert');

const MongoClient = require('mongodb').MongoClient;
const mongo = require('mongodb');
const mongoose = require('mongoose');
const dbName = 'musicbear';

const app = express();
let xhr = new XMLHttpRequest();

const dbURL = "mongodb://music:bear@localhost/topArtists";

const client = new MongoClient(dbURL);
client.connect(function(err) {
  assert.equal(null, err);
  console.log("MongoDB Connected...");

  const db = client.db(dbName);

  client.close();
});

// mongoose
//     .connect(db)
//     .then(() => console.log("MongoDB Connected..."))
//     .catch((err => console.log(err)));
//
// const artistSchema = new Schema({
//     name
// })
// mongoose.model("artist", artistSchema)

//API Key
let key = '124c939e27d006e5ebfdceb6be5bb0ec';

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Enables CORS
app.use(cors({credentials: true, origin: true}));

// Get top artists' name and listenercount <-- PETER REPLACE THIS WITH MONGODB DATABASE
let topArtists = [];
let maxPage = 4;
for (let page = 1; page <= maxPage; page++) {
    let url = "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_" +
        "key=124c939e27d006e5ebfdceb6be5bb0ec&format=json&limit=50&page=" + page;
    xhr.open("GET", url, false);
    xhr.onload = function () {
        let json = JSON.parse(this.responseText);
        json['artists']['artist'].forEach((item) => {
            topArtists.push({name: item.name.toLowerCase(), listeners: item.listeners})
        });
    };
    xhr.send();
}

// API for artists
app.get('/api/artistlist', (req, res) => {
    res.json(topArtists);
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
let users = [{'username': 'yunke', 'password': '-383459980'}]; //password: xiao

// Manage POST requests for new users
// BUGS: Any post request after the first one crashes. The request body is empty for some reason.
app.post('/api/users', (req, res) => {
    console.log(req);
    //Checks if username already exists
    let userExists = false;
    for (let item of users){
        if (item.username === req.body.username){
            userExists = true;
            break;
        }
    }
    if (!userExists){
        let user = {'username': req.body.username, 'password': req.body.password.hashCode().toString()};
        res.json({'username': req.body.username, 'password': req.body.password, 'error': '0'});
        users.push(user);
    } else {
        res.json({'username': req.body.username, 'password': req.body.password, 'error': '1'});
    }

});

// Manage sign in process
app.get('/api/users', (req, res) => {
    let password = req.query.password;
    let username = req.query.username;
    let user = null;
    for (let item of users) {
        if (item.username === username) {
            user = item;
            break;
        }
    }
    // answer = true when user exists and password matches, false otherwise
    res.json({'answer': (user !== null && password.hashCode().toString() === user.password).toString()})
});

// Manage user searches
app.get('/api/artists', (req, res) => {
   let artistList = [];
   let search = (req.query.search).toString().toLowerCase().replace('+', ' ');
   // search = search.toLowerCase().replace('+', ' ');
   for (let artist of topArtists){
       if(artist.name.indexOf(search) !== -1){
           artistList.push(artist);
       }
   }
   res.json(artistList);
});

const port = 5000;
app.listen(port, () => `Server running on port ${port}`);
