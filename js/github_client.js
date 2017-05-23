//define functions here
var baseUrl = 'https://api.github.com/'
var file_name = $('#file_name').val()
var token = $('#token').val()

var createGist = function(file_name, content, description, token){

  var newGist = {
    "public": true,
    "description": $('#description').val(),
    "files": {
      file_name: {
        "content": $('#content').val()
      }
    }
  }

// The JSON.stringify() method converts a JavaScript value to a JSON string, optionally replacing values if a replacer function is specified, or optionally including only the specified properties if a replacer array is specified.

  $.ajax({
    type: 'POST',
    url: baseUrl + 'gists',
    dataType: 'json',
    data: JSON.stringify(newGist),
    headers: {
      Authorization: "token " + token
    },
    error: function() {
      alert('Error')
    }
  }).done(function(response) {
    myGists(response.owner.login, token);
  })
}

var myGists = function (username, token){
  $.ajax({
    type: 'GET',
    url: baseUrl + 'users/' + username + '/gists',
    dataType: 'json',
    success: function(gists) {
      $.each(gists, function(i, gist) {
      addGistToDom(gist)
      })
    },
    error: function() {
      alert('Error')
    }
  })
}

var bindCreateButton = function() {
  $('#add_gist').on('click', createGist())
  // $('#link').on('click', myGists())
}

function addGistToDom(gist) {
    $("#gists").append('<li>' + gist.description + '</li>')
}

$(document).ready(function(){
  bindCreateButton()
})
