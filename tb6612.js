/****************************************************************************
 * TB6612.js
 * Implementation of class for TB6612 H-bridge chip
 * Jake Wendt
 * 24 May 2017
 * https://github.com/jmwendt/TB6612
 *
 * This library defines a simple class for driving the TB6612 H-Bridge chip
 *  used on the H-Bridge Block for Edison from SparkFun Electronics. It 
 *  provides a front end to the MRAA functions from Intel, encapsulating the
 *  various GPIO settings needed to control the TB6612.
 *
 * Development environment specifics:
 *  Code developed in Intel's XDK
 *  This code requires the Intel mraa library to function; for more
 *  information see https://github.com/intel-iot-devkit/mraa
 * ****************************************************************************/

/* spec jslint and jshint lines for desired JavaScript linting */
/* see http://www.jslint.com/help.html and http://jshint.com/docs */
/* jslint node:true */
/* jshint unused:true */
function tb6612() {
	this.mraa = require('mraa');
	this._dcA = 0.0;
	this._dcB = 0.0;

	// _pwmA is pwm channel 0, on pin 20 in mraa
	this._pwmA = new this.mraa.Pwm(20);
	this._pwmA.period_us(1000);
	this._pwmA.enable(true);

	// _pwmB is pwm channel 1, on pin 14 in mraa
	this._pwmB = new this.mraa.Pwm(14);
	this._pwmB.period_us(1000);
	this._pwmB.enable(true);

	this._pwmA.write(0.01);
	this._pwmB.write(0.01);
	this._pwmA.write(0.0);
	this._pwmB.write(0.0);

	// _A1 and _A2 are on GPIO48 and GPIO47, respectively, which are pins 33 and
  //  46 in mraa, respectively.
	this._A1 = new this.mraa.Gpio(33);
	this._A1.dir(this.mraa.DIR_OUT);
	this._A1.mode(this.mraa.MODE_STRONG);
	this._A1.write(1);

	this._A2 = new this.mraa.Gpio(46);
	this._A2.dir(this.mraa.DIR_OUT);
	this._A2.mode(this.mraa.MODE_STRONG);
	this._A2.write(1);
	
	// _B1 and _B2 are on GPIO15 and GPIO14, respectively, which are pins 48 and
  //  36, respectively
	this._B1 = new this.mraa.Gpio(48);
	this._B1.dir(this.mraa.DIR_OUT);
	this._B1.mode(this.mraa.MODE_STRONG);
	this._B1.write(1);
	
	this._B2 = new this.mraa.Gpio(36);
	this._B2.dir(this.mraa.DIR_OUT);
	this._B2.mode(this.mraa.MODE_STRONG);
	this._B2.write(1);
	
	// _standbyPin is on GPIO49, which is pin 47 in mraa
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

tb6612.prototype.getStandby = function() {
	if(this._standbyPin.read() == 0) {
		return true;
	} else {
		return false;
	}
};

tb6612.prototype.getDiffDrive = function() {
	return {
		dcA: this._dcA,
		dcB: this._dcB
	};
};

tb6612.prototype.getShortBrake = function() {
	var _brakeA, _brakeB;
	
	if(this._A1.read() == 1 && this._A2.read() == 1)
		_brakeA = true;
	else
		_brakeA = false;
	if(this._B1.read() == 1 && this._B2.read() == 1)
		_brakeB = true;
	else
		_brakeB = false;
	
	return {
		brakeA: _brakeA,
		brakeB: _brakeB
	};
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