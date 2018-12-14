const express = require('express');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const bodyParser = require('body-parser');
const cors = require('cors');
const assert = require('assert');
const util = require('util');

const MongoClient = require('mongodb').MongoClient;
const mongo = require('mongodb');
const mongoose = require('mongoose');
const dbName = 'musicbear';
require("dotenv").config();
const KEY = process.env.KEY; //API Key

function update() {
    let xhr = new XMLHttpRequest();
    const dbURL = "mongodb://music:bear@localhost/topArtists";
    const client = new MongoClient(dbURL);

    client.connect(function(err) {
      assert.equal(null, err);
      console.log("MongoDB update Connected...");
      let maxPage = 4;

      const db = client.db(dbName);
      const collection = db.collection('topArtists');
      // Insert some documents

      for (let page = 1; page <= maxPage; page++) {
          let url = "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=" +
              KEY + "&format=json&limit=50&page=" + page;
          xhr.open("GET", url, false);
          xhr.onload = function () {
              let json = JSON.parse(this.responseText);
              json['artists']['artist'].forEach((item) => {

                  collection.updateOne({ name: item.name.toLowerCase() }
                      , { $push: { listeners : item.listeners } }, function(err, result) {
                      assert.equal(err, null);
                      // console.log(util.format("Updated the document with the field %s equal to %d", item.name.toLowerCase(), item.listeners));
                    });

                  // collection.insertOne({name: item.name.toLowerCase(), listeners: [item.listeners]}, function(err, r) {
                  //   assert.equal(null, err);
                  //   assert.equal(1, r.insertedCount);
                  //   });
              });
          };
          xhr.send();
      };
      client.close();
    });
}
module.exports = update;
