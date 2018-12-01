const express = require('express');
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var bodyParser = require('body-parser');

const app = express();
let xhr = new XMLHttpRequest();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Enables CORS
app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// Get top artists' name and listenercount
let topArtists = [];
let url = "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=124c939e27d006e5ebfdceb6be5bb0ec&format=json&limit=5";
xhr.open("GET", url, true);
xhr.onload = function () {
    let json = JSON.parse(this.responseText);
    json.artists.artist.forEach((item) => {
        topArtists.push({name: item.name, listeners: item.listeners})
    });
};
xhr.send();

// API for artists
app.get('/api/artists', (req, res) => {
    res.send(topArtists);
});

// Hashing algorithm for password
String.prototype.hashCode = function () {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

// TEMPORARY USERBASE
let users = [];

// Manage POST requests for new users
app.post('/api/users', (req, res) => {
    let user = {'username': req.body.username, 'password': req.body.password.hashCode().toString()};
    res.json({'username': req.body.username, 'password': req.body.password});
    users.push(user);
});

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
    res.json({'answer': (user !== null && password.hashCode().toString() === user.password).toString()})
});

const port = 5000;
app.listen(port, () => `Server running on port ${port}`);