const cors = require('cors')
var express = require("express");
const bodyParser = require('body-parser');
var app = express();
var axios = require('axios');
const abcd=require('./abcd');




app.use(cors());
app.options('*', cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

var cricData = require('cric-player-info');
const { response } = require("express");


app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/Home', express.static(__dirname + '/public/Home'));



// will get matching player name
app.post('/getplayernames', (req, res) => {
    console.log(req.body.input)

    cricData.getMatchingPlayerNames(req.body.input).then((response) => {

        res.json({
            names: response
        })
    })

})

// will return the stats of searched player
app.post('/getplayerinfo', (req, res) => {
    console.log(req.body.playername)

    abcd.getPlayerInfoByName(req.body.playername).then((response => {
        console.log(JSON.stringify(response));
        res.json({
            info: response,
        })
    }));
})

app.post('/getplayerbatinfo', (req, res) => {
    console.log(req.body.playername)

    abcd.getPlayerBatInfoByName(req.body.playername).then((response => {
        console.log(JSON.stringify(response));
        res.json({
            info: response,
        })
    }));
})


app.post('/getplayerbowlinfo', (req, res) => {
    console.log(req.body.playername)

    abcd.getPlayerBowlInfoByName(req.body.playername).then((response => {
        console.log(JSON.stringify(response));
        res.json({
            info: response,
        })
    }));
})



var port = process.env.PORT || 8081
app.listen(port, function () {
    console.log("Server started at http://localhost:%s", port)
});