//Install express server
const express = require('express');
const path = require('path');
 
const app = express();
 
// Serve only the static files form the dist directory
// Replace the '/dist/<to_your_project_name>'
app.use(express.static(__dirname + '/dist/FitbitTeam'));

// Set port of app
// process.env lets port be set by heroku
var port = process.env.PORT || 8080;
app.listen(process.env.PORT || 8080);
 
app.get('*', function(req,res) {
  // Replace the '/dist/<to_your_project_name>/index.html'
  res.sendFile(path.join(__dirname + '/dist/FitbitTeam/index.html'));
});

console.log('Console Listening');