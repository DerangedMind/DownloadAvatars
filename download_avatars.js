// use git for version control

// call script via terminal with args:
//   node download_avatars.js <GH_USER> <REPO>

// download images to folder "./avatars/" 
// images should be named <GH_USER>.png


// GitHub API JSON keys:

// login, avatar_url

var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader');

function getRepoContributors(repoOwner, repoName, cb) {
  
}

getRepoContributors("jquery", "jquery", function (err, result) {
  console.log("Errors: " + err);
  console.log("Result: " + result);
})