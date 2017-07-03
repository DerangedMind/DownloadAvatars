// use git for version control

// call script via terminal with args:
//   node download_avatars.js <GH_USER> <REPO>

// download images to folder "./avatars/" 
// images should be named <GH_USER>.png


// GitHub API JSON keys:

// login, avatar_url

// token: fd6bd42b0966cd0392bfc92bc9a2daac12b38339

var request = require('request');
var GITHUB_USER = "DerangedMind";
var GITHUB_TOKEN = "fd6bd42b0966cd0392bfc92bc9a2daac12b38339";

console.log('Welcome to the GitHub Avatar Downloader');

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);
}

getRepoContributors("jquery", "jquery", function (err, result) {
  console.log("Errors: " + err);
  console.log("Result: " + result);
})