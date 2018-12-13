let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let httpRequest = new XMLHttpRequest();
let url = "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=124c939e27d006e5ebfdceb6be5bb0ec&format=json&limit=5";
let topArtists = [];

httpRequest.open("GET", url, true);
httpRequest.send();
httpRequest.onload = function(){
    let json = JSON.parse(this.responseText);
    json.artists.artist.forEach((item) => {
        topArtists.push(item.name)
    });
};

function getListenCount(){
    let url = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=queen&api_key=124c939e27d006e5ebfdceb6be5bb0ec&format=json";
    httpRequest.open("GET", url, true);
    httpRequest.send();
    httpRequest.onload = function () {
        let json = JSON.parse(this.responseText);
        console.log('LISTENERS: '+json['artist']['stats']['listeners']);
        console.log('PLAYS: '+json['artist']['stats']['playcount']);
    };
}
let run = global.setInterval(getListenCount, 1000);