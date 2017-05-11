/* spec jslint and jshint lines for desired JavaScript linting */
/* see http://www.jslint.com/help.html and http://jshint.com/docs */
/* jslint node:true */
/* jshint unused:true */
function tb6612() {
	this.mraa = require('mraa');
	this._dcA = 0.0;
	this._dcB = 0.0;

	this._pwmA = new this.mraa.Pwm(20);
	this._pwmA.period_us(1000);
	this._pwmA.enable(true);

	this._pwmB = new this.mraa.Pwm(14);
	this._pwmB.period_us(1000);
	this._pwmB.enable(true);

	this._pwmA.write(0.01);
	this._pwmB.write(0.01);
	this._pwmA.write(0.0);
	this._pwmB.write(0.0);

	this._A1 = new this.mraa.Gpio(33);
	this._A1.dir(this.mraa.DIR_OUT);
	this._A1.mode(this.mraa.MODE_STRONG);
	this._A1.write(1);

	this._A2 = new this.mraa.Gpio(46);
	this._A2.dir(this.mraa.DIR_OUT);
	this._A2.mode(this.mraa.MODE_STRONG);
	this._A2.write(1);
	
	this._B1 = new this.mraa.Gpio(48);
	this._B1.dir(this.mraa.DIR_OUT);
	this._B1.mode(this.mraa.MODE_STRONG);
	this._B1.write(1);
	
	this._B2 = new this.mraa.Gpio(36);
	this._B2.dir(this.mraa.DIR_OUT);
	this._B2.mode(this.mraa.MODE_STRONG);
	this._B2.write(1);
	
	this._standbyPin = new this.mraa.Gpio(47);
	this._standbyPin.dir(this.mraa.DIR_OUT);
	this._standbyPin.mode(this.mraa.MODE_STRONG);
	this._standbyPin.write(1);
}

tb6612.prototype.diffDrive = function(dcA, dcB) {
	this._dcA = dcA;
	this._dcB = dcB;

	if(dcA < 0) {
	   this.revA();
	   dcA = dcA * -1;
	} else {
	   this.fwdA();
	}

	if(dcB < 0) {
	   this.revB();
	   dcB = dcB * -1;
	} else {
	   this.fwdB();
	}

	this._pwmA.write(dcA);
	this._pwmB.write(dcB);
};

tb6612.prototype.standby = function(disableMotors) {
	if(disableMotors) {
	   this._standbyPin.write(0);
	} else {
	   this._standbyPin.write(1);
	}
};

tb6612.prototype.shortBrake = function(brakeA, brakeB) {
	if(brakeA) {
	   this._A1.write(1);
	   this._A2.write(1);
	}
	if(brakeB) {
	   this._B1.write(1);
	   this._B2.write(1);
	}
};

tb6612.prototype.fwdA = function() {
	this._A1.write(0);
	this._A2.write(1);
};

tb6612.prototype.revA = function() {
	this._A1.write(1);
	this._A2.write(0);
};

tb6612.prototype.fwdB = function() {
	this._B1.write(0);
	this._B2.write(1);
};

tb6612.prototype.revB = function() {
	this._B1.write(1);
	this._B2.write(0);
};

module.exports = tb6612;