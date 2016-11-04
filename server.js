var slackbots = require('slackbots');
var express = require('express');

var app = express();

/* Idea List - 
    /idea A sentence or two to remind you what your idea is
    Will be added to a shared google doc, with your name; Will also be announced in the channel that you /idea in
*/

app.get('/addIdea', function (req, res ) { 
    console.log(req);
    if(req.body.token == "6zDOEzR6085tU8K7QhCwfB5i") { 
        //Get the text
        //req.body.text & req.body.response_url 
    } else {
        res.send("Invalid Token");
    }
})



app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() { 
    console.log("Going live!"); 

})