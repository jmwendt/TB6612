/****************************************************************************
 * main.js
 * Node.js webserver
 * Jake Wendt
 * 24 May 2017
 * https://github.com/jmwendt/TB6612
 *
 * This is a simple webserver implementing the tb6612 library for testing
 * ****************************************************************************/

/* spec jslint and jshint lines for desired JavaScript linting */
/* see http://www.jslint.com/help.html and http://jshint.com/docs */
/* jslint node:true */
/* jshint unused:true */

var http = require("http"),
	express = require('express'),
	morgan = require('morgan'),
	tb6612 = require('./tb6612.js');

var motor = new tb6612();
var fwd = 0,
		rev = 0,
		left = 0,
		right = 0;

var ipPort = 1337;

var app = express();
app.set('port', ipPort);
app.use(express.static(__dirname));
app.use(morgan('dev'));

app.get('/wasd', function(req, res) {
	if(req.query.w == 'true')
		fwd = 1;
	else
		fwd = 0;
	if(req.query.s == 'true')
		rev = -1;
	else
		rev = 0;
	
	if(req.query.a == 'true' && req.query.d == 'true') {
		left = 0;
		right = 0;
	} else if(req.query.a == 'true' || req.query.d == 'true') {
		if(req.query.a == 'true') {
			left = 0.5;
			right = -0.5;
		}
		if(req.query.d == 'true') {
			right = 0.5;
			left = -0.5;
		}
	} else {
		left = 0;
		right = 0;
	}

	var speed = fwd + rev;
	var leftSpeed = speed + left;
	var rightSpeed = speed + right;
	if(leftSpeed > 1)
		leftSpeed = 1;
	if(leftSpeed < -1)
		leftSpeed = -1;
	if(rightSpeed > 1)
		rightSpeed = 1;
	if(rightSpeed < -1)
		rightSpeed = -1;
	if(leftSpeed == 0 && rightSpeed == 0)
		motor.shortBrake(true, true);
	else
		motor.shortBrake(false, false);
	motor.diffDrive(leftSpeed * 0.5, rightSpeed * 0.5);
	res.send(leftSpeed + ", " + rightSpeed);
});

app.get('/', function(req, res) {
	res.sendFile('index.html', {root: __dirname});
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('HTTP server listening on port ' + app.get('port'));
});