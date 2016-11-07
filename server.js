var slackbots = require('slackbots');
var express = require('express');
var GoogleSpreadsheet = require('google-spreadsheet');
var bodyParser = require('body-parser');

var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

/* Idea List - 
    /idea A sentence or two to remind you what your idea is
    Will be added to a shared google doc, with your name; Will also be announced in the channel that you /idea in
*/

var doc = new GoogleSpreadsheet('1ik-amGj9udS8Ib3AGh7s4yuWW_p2TECjX-DpfG8yrv0');
var worksheetID;
var worksheetURL;

function connectToGSheets() { 
    doc.useServiceAccountAuth({ client_email: 'slackapi@bitslack-148811.iam.gserviceaccount.com', private_key: process.env.GOOGLE_PRIVATE_KEY },
    function () { 
        doc.getInfo(function( err, info ) { 
            console.log(info)
            console.log(info.worksheets[0]);
            worksheetID = info.worksheets[0].id;
            worksheetURL = info.worksheets[0].url;

        })
    })
}

connectToGSheets();

app.post('/addIdea', function (req, res ) { 
    console.log(req);
    if(req.body.token == "6zDOEzR6085tU8K7QhCwfB5i") { 
        //Get the text
        //req.body.text & req.body.response_url 
        var insertion = { 
            idea: req.body.text,
            author: req.body.user_name
        };
        doc.addRow(worksheetID, insertion, function () {});
        res.send({text: `${req.body.user_name} added an idea to the ideas list! Check it out here: ${worksheetURL}`, response_type:"in_channel"});       
    } else {
        res.send("Invalid Token");
    }
})



app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() { 
    console.log("Going live!"); 

})