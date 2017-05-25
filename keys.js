/**************
 * keys.js
 * Javascript file for detecting WASD key input / mobile touch
 * Jake Wendt
 * 24 May 2017
 * https://github.com/jmwendt/TB6612
 *
 * Detects WASD key input or mobile touch input and sends information to server
 * on key states (up or down) to the server any time a key state changes.
 *
 * Requires JQuery >3.0.0
 *
 * Keycodes for reference
 * w = 87
 * a = 65
 * s = 83
 * d = 68 
 **************/
var down = {
	w: false,
	a: false,
	s: false,
	d: false
};

$(window).on('keydown', function(e) {
	var code = e.keyCode || e.which;
	var changed = false;
	
	if(code == 87 && !down.w) {
		$('#w').addClass('highlight');
		changed = true;
		down.w = true;
	} else if(code == 65 && !down.a) {
		$('#a').addClass('highlight');
		changed = true;
		down.a = true;
	} else if(code == 83 && !down.s) {
		$('#s').addClass('highlight');
		changed = true;
		down.s = true;
	} else if(code == 68 && !down.d) {
		$('#d').addClass('highlight');
		changed = true;
		down.d = true;
	}
	
	if(changed) {
		$.ajax({
			url: 'wasd',
			data: {
				w: down.w,
				a: down.a,
				s: down.s,
				d: down.d
			}
		});
	}
});

$(window).on('keyup', function(e) {
	var code = e.keyCode || e.which;
	var changed = false;
	
	if(code == 87) {
		$('#w').removeClass('highlight');
		changed = true;
		down.w = false;
	} else if(code == 65) {
		$('#a').removeClass('highlight');
		changed = true;
		down.a = false;
	} else if(code == 83) {
		$('#s').removeClass('highlight');
		changed = true;
		down.s = false;
	} else if(code == 68) {
		$('#d').removeClass('highlight');
		changed = true;
		down.d = false;
	}
	
	if(changed) {
		$.ajax({
			url: 'wasd',
			data: {
				w: down.w,
				a: down.a,
				s: down.s,
				d: down.d
			}
		});
	}
});

function tstart(code) {
	var changed = false;
	
	if(code == 87 && !down.w) {
		$('#w').addClass('highlight');
		changed = true;
		down.w = true;
	} else if(code == 65 && !down.a) {
		$('#a').addClass('highlight');
		changed = true;
		down.a = true;
	} else if(code == 83 && !down.s) {
		$('#s').addClass('highlight');
		changed = true;
		down.s = true;
	} else if(code == 68 && !down.d) {
		$('#d').addClass('highlight');
		changed = true;
		down.d = true;
	}
	
	if(changed) {
		$.ajax({
			url: 'wasd',
			data: {
				w: down.w,
				a: down.a,
				s: down.s,
				d: down.d
			}
		});
	}
}

function tend(code) {
	var changed = false;
	
	if(code == 87) {
		$('#w').removeClass('highlight');
		changed = true;
		down.w = false;
	} else if(code == 65) {
		$('#a').removeClass('highlight');
		changed = true;
		down.a = false;
	} else if(code == 83) {
		$('#s').removeClass('highlight');
		changed = true;
		down.s = false;
	} else if(code == 68) {
		$('#d').removeClass('highlight');
		changed = true;
		down.d = false;
	}
	
	if(changed) {
		$.ajax({
			url: 'wasd',
			data: {
				w: down.w,
				a: down.a,
				s: down.s,
				d: down.d
			}
		});
	}
}