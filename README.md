SparkFun H-Bridge Block for Edison Node.js Library
============================================

SparkFun's H-Bridge Block for Edison adds a two-channel low-voltage
low-current h-bridge (the Toshiba TB6612) to your stack. The block can be
configured to draw power either from the VSYS supply of the stack or from an
external supply connected to the header on the block.

This library abstracts all of the IO handling away from the user; all the user
need do is provide a signed floating point value representing the duty cycle
(from -1.0 to +1.0) for each motor.

Repository Contents
-------------------

* **tb6612.js** - Class implementation for tb6612 class.
* **main.js** - Node.js webserver with simple implementation of tb6612 class
* **keys.js** - Javascript file for capturing keyboard input or mobile touch,
used by main.js
* **index.html** - HTML file used by main.js for example

Documentation
-------------

This library uses Intel's [mraa](https://github.com/intel-iot-devkit/mraa) 
library to access hardware resources.

To run the example:

* Copy repository's contents to Intel Edison (or clone from git directly)
* Navigate to the directory on your Edison
* Install Node.js packages by running 'npm install'
* Run the servery with 'node main.js'
* In a browser on your computer or phone go to [yourEdison'sIP]:1337
* You should see a screen with the classic WASD which will responde to 
touch or keyboard input

License Information
-------------------

This product is _**open source**_! 

The code is released under GPL. 

Distributed as-is; no warranty is given.