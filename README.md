# LIRIbot

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.


"concert-this"
When the user selects concert-this and inputs an artist, the program creates a bandsintown queryURL and uses an axios call to get the most recent concert data for the artist, which includes:

Name of the venue
Venue location
Date of the Event (use moment to format this as "MM/DD/YYYY")
"spotify-this-song"
Spotify-this-song coupled with a song title searches the node-spotify-api and will return the following information about the user's song selection:

Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from
"movie-this"
Movie-this added with a movie title will create a queryURL which is then sent through an axios call to the OMDB api and will return the following about the movie:

Title of the movie.
Year the movie came out.
IMDB Rating of the movie.
Rotten Tomatoes Rating of the movie.
Country where the movie was produced.
Language of the movie.
Plot of the movie.
Actors in the movie.
"do-what-it-says"
reads the random.txt file and runs the command and input written on it.


### Watch a video of LIRIbot [Here](https://drive.google.com/file/d/1rmp22fc8oKUd0kdHVsdTAovSQPxsU0lP/view?usp=sharing)