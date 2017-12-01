// Including and starting all inclusions
var serverPort = 5000;
var express = require("express");
var app = express(), 
bodyParser = require('body-parser'),
server = require('http').createServer(app),
Sequelize = require('sequelize')

const sequelize = new Sequelize('BBD', 'master', 'longJohnbronze75', {
  host: 'bbd.chbunwhrksgq.us-east-2.rds.amazonaws.com',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

app.use(express.static(__dirname + '/app'));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
	extended: true
	}));   // to support URL-encoded bodies

app.use(function(req,res,next){
		// Website you wish to allow to connect
		res.setHeader('Access-Control-Allow-Origin', '*');
		next();
	});


console.log("[I] Express server started on port " + serverPort + " ...");


var project = require("./project/app.js");
project(app, sequelize);

server.listen(serverPort);
