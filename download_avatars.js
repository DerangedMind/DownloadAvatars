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
var SAVE_TO_FOLDER = './avatars/'

var GITHUB_URL = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/`;

var stdARGS = process.argv.slice(2);

console.log('Welcome to the GitHub Avatar Downloader');

checkArgs();

function checkArgs() {
  if (stdARGS.length < 2) {
    console.log("You forgot to include an owner or repo!");
    return;
  }
  if (stdARGS.length > 2) {
    console.log("You included too many arguments!");
    return;
  }
  console.log("User exists? " + userExists());

  getRepoContributors(handleRequest);
  
}

function checkExistance() {

}

// to check if user exists, 
//  go to api.github.com/users/<repoOwner>
//  parse it as a json
//  check if the key "message" is Not Found
//    if yes, return false and stop running
//    if no, continue

function userExists() {
  var requestURL = {
    url: GITHUB_URL + 'users/' + stdARGS[0],
    headers: {
      'User-Agent': 'DerangedMind'
    }
  }

  request
    .get(requestURL)
    .on('response', function (response) {
      console.log(response)
    }) 
  // (requestURL, function(err, result, body) {
  //   if (err) { throw console.log("Errors: " + err); }

  //   var json = parseJSON(body);
  //   for (var gitUser in json) {
  //     console.log("hello?")
  //     if (json[gitUser]["messages"] === "Not Found") {
  //       return false;
  //     }
  //   }
  // });
}

function getRepoContributors(callback) {
  var requestURL = {
    url: GITHUB_URL + 'repos/' + stdARGS[0] + '/' + stdARGS[1] + '/contributors',
    headers: {
      'User-Agent': 'DerangedMind'
    }
  };

  request(requestURL, callback);
}

function handleRequest(err, result, body) {
  if (err) { throw console.log("Errors: " + err); }
  var json = parseJSON(body);

  cycleContributors(result, json);
}

function parseJSON(body) {
  return JSON.parse(body);
}

function cycleContributors(result, _bodyJSON) {
  fs.access(SAVE_TO_FOLDER, function (err) {
    if (err && err.code === 'ENOENT') {
      fs.mkdir(SAVE_TO_FOLDER);
    }
  });
    
  for (var contributor in _bodyJSON) {
    downloadImageByURL(result, _bodyJSON[contributor]);
  } 
}

function downloadImageByURL(result, contributor) {
  var username = contributor['login'];
  var _url = contributor['avatar_url'];
  var contentType = '';


  request
    .get(_url)
    .on('response', function(response) {
      console.log("Downloading avatars...");
      contentType = response.headers['content-type'].split('/')[1];
      console.log(contentType);
      console.log(`${SAVE_TO_FOLDER}${username}.${contentType}`);
    })
    .pipe(fs.createWriteStream(`${SAVE_TO_FOLDER}${username}.${contentType}`))
    .on('finish', function() {
      console.log("Download complete.");
    });
}