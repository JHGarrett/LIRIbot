require("dotenv").config();
var fs = require("fs");
var chalk = require('chalk');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios")
var moment = require("moment")


// spotify package
var spotify = new Spotify(keys.spotify);


// user input must be in lower case per bandsintown api
var command = process.argv[2].toLowerCase();
var data = process.argv.slice(3).join(" ");


// Bandsintown api pull for user input
function concertThis(artist){
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(function(response){
        var events = response.data;
            console.log(chalk.green("---------------Getting Results----------------"));
            for (let i = 0; i < events.length; i++) {
                console.log(artist + " is performing @ " + events[i].venue.name + " on " + moment(events[i].venue.datetime).format("LLLL"))
            }
            console.log(chalk.cyan("----------------------------"));
    }).catch(function(err){
        console.log(chalk.green("Sorry, that Band must be lame because I couldn't find it. Try again hipster!"));

        console.log(chalk.cyan("----------------------------"));
    })
}




// Spotify api pull for user input
function spotifyThisSong(song){
    spotify.search({
        
    })

}





// OMDb api pull for user input of movie




// read the random.txt for random commands


// run this thing