const express = require('express');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const bodyParser = require('body-parser');
const cors = require('cors');
const assert = require('assert');

const MongoClient = require('mongodb').MongoClient;
const mongo = require('mongodb');
const mongoose = require('mongoose');
const dbName = 'musicbear';

let xhr = new XMLHttpRequest();

const dbURL = "mongodb://music:bear@localhost/topArtists";

const client = new MongoClient(dbURL);
client.connect(function(err) {
    assert.equal(null, err);
    console.log("MongoDB Connected...");
    let maxPage = 4;

    const db = client.db(dbName);
    const collection = db.collection('topArtists');
    // Insert some documents

    for (let page = 1; page <= maxPage; page++) {
        let url = "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_" +
            "key=124c939e27d006e5ebfdceb6be5bb0ec&format=json&limit=50&page=" + page;
        xhr.open("GET", url, false);
        xhr.onload = function() {
            let json = JSON.parse(this.responseText);
            json['artists']['artist'].forEach((item) => {
                collection.insertOne({
                    name: item.name.toLowerCase(),
                    listeners: [item.listeners]
                }, function(err, r) {
                    assert.equal(null, err);
                    assert.equal(1, r.insertedCount);
                });
            });
        };
        xhr.send();
    };
    client.close();
});
