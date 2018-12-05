var request = require('request');
var mytoken = require('./secrets.js');
// var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {

  var options = {

    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token' + mytoken.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var obj = JSON.parse(body);
    cb(err, obj)
  })

}

var iterateOverResults =  function(err, result) {
  var resultsObject = {};
  for (key in result){
    resultsObject.path = result[key].login;
    resultsObject.avatarUrl = result[key].avatar_url;
    downloadImageByURL(resultsObject.avatarUrl, resultsObject.path)
  }

  console.log(resultsObject);


};

function downloadImageByURL(url,path) {

var fs = require('fs');

request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .on('response', function (response) {
     console.log('Response Status Code: ', response.statusCode);
     console.log('Response Message: ', response.statusMessage);
     console.log('Content type: ', response.headers['content-type']);
    })
    .pipe(fs.createWriteStream('avatar/'+ path +'.png'));
}

getRepoContributors("jquery", "jquery", iterateOverResults);




// downloadImageByURL(avatar_url, "kvirani.jpg")

// With the downloadImageByURL function implemented, you can now connect these two functions by passing in avatar_url from your callback function into downloadImageByURL.

// Here is an English description of how control flows through all your functions:

// getRepoContributors makes a request for JSON, getting back an array of contributors.
// getRepoContributors passes this data to cb, an anonymous callback function that it is given.
// cb loops through each item in the array:
// It constructs a file path using the login value (e.g., "avatars/dhh.jpg")
// It then passes the avatar_url value and the file path to downloadImageByURL
// downloadImageByURL fetches the desired avatar_url and saves this information to the given filePath
