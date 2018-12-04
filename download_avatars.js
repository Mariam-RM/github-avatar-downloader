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

  for (key in result){
    console.log(result[key].avatar_url);
  }
};

function downloadImageByURL(url,path) {

var fs = require('fs');

request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .on('response', function (response) {
     console.log('Response Status Code: ', response.statusCodxe);
     console.log('Response Message: ', response.statusMessage);
     console.log('Content type: ', response.headers['content-type']);
    })
    .pipe(fs.createWriteStream(path));
}

getRepoContributors("jquery", "jquery", iterateOverResults);



//Your next and final step in this exercise should be to change your getRepoContributors function to parse the JSON string into an object and pass this object (an array of contributor objects) to the cb function.

// You will also need to modify the callback function to iterate over the results and (for now) console.log the value for each avatar_url in the collection:
downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "kvirani.jpg")