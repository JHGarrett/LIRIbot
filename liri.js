require("dotenv").config();
var chalk = require('chalk');
var keys = require("./keys.js");
var fs = require("fs");

var Spotify = require('node-spotify-api');
var axios = require("axios")
var moment = require("moment")

// spotify package
var spotify = new Spotify(keys.spotify);


// user input must be in lower case per bandsintown api
var command = process.argv[2].toLowerCase();
var data = process.argv.slice(3).join(" ");


// Bandsintown api pull for user input
// function concertThis(artist){
//     var results = "Bands in town results\n"
//     var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
//     axios.get(queryURL).then(function(response){
//         var events = response.data;
//             console.log(chalk.green("---------------Getting Results----------------"));
//             for (var i = 0; i < events.length; i++) {
//                 results += artist + " is performing @ " + events[i].venue.name + " on " + moment(events[i].venue.datetime).format("LLLL") + "\n"
//             }
//             results += chalk.cyan("----------------------------");
//     }).catch(function(e){
//         results += chalk.green("Sorry, that Band must be lame because I couldn't find it. Try again hipster!");

//         // console.log(chalk.cyan("----------------------------"));
//     })
// }
function concertThis(artist){
    var results = "Bands in Town Results\n"
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(function(response){
        var events = response.data;
        // console.log("==============================================Printing Bands in Town Results ==============================================")

        for(var i = 0; i < events.length; i++){
            
            results += artist + " is performing @ " + events[i].venue.name +" on " + moment(events[i].venue.datetime).format("LLLL") + "\n"
        }
        results += "==========================="
        appendResults(results)    
    }).catch(function(e){
        results += "Sorry, that Band must be lame because I couldn't find it.\n ==========================="
        appendResults(results)    
     
    })
    
}




// Spotify api pull for user input
function spotifyThisSong (song){
    spotify
    .search({ type: 'track', query: song, limit: 1})
    .then(function(response) {
           var results = response.tracks.items;
           var resultsFound = (results.length > 0)
           if(resultsFound){
               
               var track = results[0];

               var artistNames = ""
               for (var i = 0; i < track.artists.length; i++){
                   artistNames += track.artists[i].name + ", "
               }
               artistNames = artistNames.slice(0, -2)

               var results =  
               `
               Spotify Results
               Track Name:    ${track.name}
               Artists:  ${artistNames}
               Preview Link: ${track.href}
               Album Name: ${track.album.name}
               ===============================
               `
               // console.log(results)
               }
               
           else{
               
               var results =  
               `
               Spotify Results
               Sorry, cannot find track information for requested song in Spotify
               =====================================================
               `
           }
           appendResults(results)
       })
       .catch(function(err) {
           console.log(err);    
       });
           
}

//Function pulls API info from given movie
function movieThis(movie){
   var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
   axios.get(queryURL).then(function(response){
      var movieResult = response.data;
      if(movieResult.Title){
           var rottenTomatoRating = ""
           if(movieResult.Ratings[1]){
               rottenTomatoRating = movieResult.Ratings[1].Value;
           }else{
               rottenTomatoRating = "N/A";
           }


           var results = 
           `
           OMDB Results
           Title Name: ${movieResult.Title}
           Year:  ${movieResult.Year}
           IMDB Rating: ${movieResult.imdbRating}
           Rotten Tomato Rating: ${rottenTomatoRating }
           Country Produced: ${movieResult.Country}      
           Languages: ${movieResult.Languages}     
           Plot: ${movieResult.Plot}
           Actors: ${movieResult.Actors}
           ===============================           
            `
      }
      else{
       var results = 
       `
       OMDB Results
       Sorry, this movie does not exist in OMDB API.
       ===============================================================
       `
      }
      appendResults(results)
   }).catch(function(e){
       console.log(e)
   })
}


// read the random.txt for random commands

function doWhatItSays(){
   fs.readFile("./random.txt", "utf8", function(err, data){
       if(err){console.log(err)}
       else{
           var content = data.split("\n")
           for(var i = 0; i < content.length; i++){
               var line = content[i].split(",");
               switch (line[0].trim()){
               case "concert-this":
               concertThis(line[1].trim())
               break;

               case "spotify-this-song":
               spotifyThisSong(line[1].trim())
               break;

               case "movie-this":
               movieThis(line[1].trim())
               break;

               default:
               break;
               }
           }

           }
   })
}


function appendResults(r){

   console.log(r);

   fs.appendFile("log.txt", r+"\n", function(error){
       if(error) {console.log(error)}
       else{ console.log("Results added!")}
   })
}

function main(){

   fs.appendFile("log.txt", command+ " " + data +"\n", function(error){
       if(error) {console.log(error)}
       else{ console.log("Command added!")}
   })

   if (command === "concert-this"){;
       concertThis(data)
   } else if(command === "spotify-this-song"){
       if(!data){
           data = "The Way Ace of Base"
       }
        spotifyThisSong(data)
   }else if(command === "movie-this"){
       if(!data){
           data = "Mr. Nobody"
       }
       movieThis(data)
   }else if(command === "do-what-it-says"){
       doWhatItSays()
   }

}

// run this thing
main()










