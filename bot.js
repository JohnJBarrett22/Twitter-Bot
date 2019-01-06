console.log("~Twitter bot initiating!~")

var Twit = require('twit');
var config = require('./config')

var T = new Twit(config)