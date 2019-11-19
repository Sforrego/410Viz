// this is where the code that will take the time frame given by the user and pass on the information
// to the back end where the http requests will be made

$(document).ready(function() {
    $('#submit').click(function() {
        var repoUrl = $('#repoUrl').val();
        var monthYear = $('#monthYear').val();
        if (repoUrl === "" || monthYear === "") {
            alert("please fill out fields");
            return false;
        }
        //alert( "repoUrl: " + repoUrl + " monthYear: " + monthYear );
        $.ajax({
            url: "/generate",
            dataType: 'json',
            data: {
                repoURL: $('#repoUrl').val(),
                monthYear: $('#monthYear').val()
            },
            type: 'POST',
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);
            }
        })
      });
});

$('#submit').click(function() {
    alert( "Handler for .click() called." );
  });
