var request = require('request');
var mytoken = require('./secrets.js')

console.log('Welcome to the GitHub Avatar Downloader!');

function request (options, cb) {

}

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

   // ...
}

var iterateOverResults =  function(err, result) {

  for (key in result){
    console.log(result[key].avatar_url);
  }
};

getRepoContributors("jquery", "jquery", iterateOverResults);



//Your next and final step in this exercise should be to change your getRepoContributors function to parse the JSON string into an object and pass this object (an array of contributor objects) to the cb function.

// You will also need to modify the callback function to iterate over the results and (for now) console.log the value for each avatar_url in the collection: