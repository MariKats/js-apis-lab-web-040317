//define functions here
var baseUrl = 'https://api.github.com/'

var createGist = function(file_name, content, description, token){

  var newGist = {
    "public": true,
    "description": description,
    "files": {}
    }
    newGist["files"][file_name]= {"content": content}

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
  $('#add_gist').on('click', function(event){
    event.preventDefault()
    createGist(file_name, content, description, token)
    var file_name = $('#file_name').val()
    var token = $('#token').val()
    var description = $('#description').val()
    var content = $('#content').val()
  })
}

function addGistToDom(gist) {
    $("#gists").append('<li>' + gist.description + '</li>')
}

$(document).ready(function(e){
  e.preventDefault
  bindCreateButton()
})
