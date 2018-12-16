var express = require('express');
var router = express.Router();

/* GET home page + set some cookies there */
router.get("/", function(req, res) {
    res.sendFile("splash.html", { root: "./public" });

    //set sessionID as cookies to identify the user 
    let sessionID = Math.floor(Math.random() * 1000000);


    if (!req.cookies['sessionID']) {
        res.cookie("sessionID", sessionID);
        console.log("Cookies (sessionID) has been sent");
    }
});

/* GET game page */
router.get("/game", function(req, res) {
    res.sendFile("game.html", { root: "./public" });
});

module.exports = router;