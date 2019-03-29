# Spotify-Youtube Bridge
## A MERN STACK APPLICATION THAT ALLOWS YOU TO BROWSE SPOTIFY AND DOWNLOAD VIA YOUTUBE.

##Steps:
1. ### Run ```npm install```: 
    As simple as it sounds, go into the root and client directories and the run the command.
    
2. ### Create a spotify application and get the client secret and the client id:
    <a href="https://developer.spotify.com/console/">Click Here to Create your applicaiton.</a>

3. ### GET A YOUTUBE DATA API V3 KEY:
    <a href="https://console.developers.google.com/">Click Here to Get Your Key.</a>
    
4. ### CREATE A ```config``` folder in the client directory and the root directory.
     Add a ```keys.js``` file in the /config folder.
     The structure will be as follows: 
     
     ```
      module.exports = {
          key: 'thisisasecret',
          clientID: 'YOUR_SPOTIFY_CLIENT_ID',
          clientSecret: 'YOUT_SPOTIFY_CLIENT_SECRET',
          callbackURL: 'YOUR_SPOTIFY_CALLBACK_URL',
          baseUrl: 'http://localhost:3000'
      };
      ```
      
      #### Inside client/config, create a file called ```config.js```.
         The structure of the file: 
   
            module.exports = {
                baseUrl:'http://localhost:5000',
                youtubeApi: 'YOUR_YOUTUBE_DATA_API_KEY'
              };
         
5. ## RUN ```npm run dev```
