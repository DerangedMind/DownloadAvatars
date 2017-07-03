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
require('dotenv').config();

var GITHUB_USER = process.env.GITHUB_USER;
var GITHUB_TOKEN = process.env.GITHUB_TOKEN;
console.log(GITHUB_USER)

var stdARGS = process.argv.slice(2);

console.log('Welcome to the GitHub Avatar Downloader');

checkArgs();

function checkArgs() {
  if (stdARGS.length < 2) {
    console.log("You forgot to include an owner or repo!");
    return;
  }
  console.log("what");
  getRepoContributors(stdARGS[0], stdARGS[1], handleRequest);
}

function getRepoContributors(repoOwner, repoName, callback) {
  var requestURL = {
    url: 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'DerangedMind'
    }
  };
  console.log("where do we get stuck?");
  request(requestURL, callback);
  
}

function handleRequest(err, result, body) {
  if (err) {
    throw console.log("Errors: " + err);
  }

  cycleContributors(result, parseJSON(body));
  
}

function downloadImageByURL(result, contributor) {
  var username = contributor['login'];
  var _url = contributor['avatar_url'];
  

  request
    .get(_url)
    .on('response', function() {
      console.log("Downloading avatars...");
    })
    .pipe(fs.createWriteStream('./avatars/' + username + '.jpg'))
    .on('finish', function() {
      console.log("Download complete.");
    });
}



function parseJSON(body) {

  return JSON.parse(body);
}

function cycleContributors(result, _bodyJSON) {

  for (var contributor in _bodyJSON) {
    downloadImageByURL(result, _bodyJSON[contributor]);
  }
  
}

