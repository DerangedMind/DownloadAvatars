// use git for version control

// call script via terminal with args:
//   node download_avatars.js <GH_USER> <REPO>

// download images to folder "./avatars/" 
// images should be named <GH_USER>.png


// GitHub API JSON keys:

// login, avatar_url

// token: fd6bd42b0966cd0392bfc92bc9a2daac12b38339

var request = require('request');
var fs = require('fs');
var GITHUB_USER = "DerangedMind";
var GITHUB_TOKEN = "80fa3987b1f0846b40c281ace9801490d4937bf8";

console.log('Welcome to the GitHub Avatar Downloader');

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = {
    url: 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'DerangedMind'
    }
  };

  console.log(requestURL)

  request(requestURL, cb)
  
}

function downloadImageByURL(result, contributor) {
  var username = contributor['login'];
  var _url = contributor['avatar_url'];

  console.log(username, _url)
}

getRepoContributors("jquery", "jquery", function (err, result, body) {
  console.log("Errors: " + err);
  var bodyJSON = JSON.parse(body);
  for (var contributor in bodyJSON) {
    downloadImageByURL(result, bodyJSON[contributor])
  }



})

