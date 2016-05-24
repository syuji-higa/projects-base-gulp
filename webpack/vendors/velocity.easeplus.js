/*!
 * Ease+ for Velocity.js v1.2.2
 * v1.2
 *
 * Copyright (c) 2015 Yuichiroh Arai
 * Released under the MIT license
 * http://opensource.org/licenses/mit-license.php
 *
 *
 *
 * All easing functions from TweenJS
 * http://createjs.com/
 *
 * Copyright (c) 2011-2015 gskinner.com, inc.
 * Released under the MIT license
 * http://opensource.org/licenses/mit-license.php
 *
 */
(function () {

	var easings = Velocity.Easings;

	// -------------------- back
	easings.getBackIn = function(amount) {
		return function(t) {
			return t*t*((amount+1)*t-amount);
		}
	};
	easings.getBackOut = function(amount) {
		return function(t) {
			return (--t*t*((amount+1)*t + amount) + 1);
		}
	};
	easings.getBackInOut = function(amount) {
		amount*=1.525;
		return function(t) {
			if ((t*=2)<1) return 0.5*(t*t*((amount+1)*t-amount));
			return 0.5*((t-=2)*t*((amount+1)*t+amount)+2);
		}
	};

	easings.easeInBack = easings.getBackIn(1.7);
	easings.easeOutBack = easings.getBackOut(1.7);
	easings.easeInOutBack = easings.getBackInOut(1.7);

	easings.addBackIn = function(name, amount) {
		easings[name] = easings.getBackIn(amount);
	};
	easings.addBackOut = function(name, amount) {
		easings[name] = easings.getBackOut(amount);
	};
	easings.addBackInOut = function(name, amount) {
		easings[name] = easings.getBackInOut(amount);
	};



	// -------------------- elastic
	easings.getElasticIn = function(amplitude,period) {
		var pi2 = Math.PI*2;
		return function(t) {
			if (t==0 || t==1) return t;
			var s = period/pi2*Math.asin(1/amplitude);
			return -(amplitude*Math.pow(2,10*(t-=1))*Math.sin((t-s)*pi2/period));
		}
	};
	easings.getElasticOut = function(amplitude,period) {
		var pi2 = Math.PI*2;
		return function(t) {
			if (t==0 || t==1) return t;
			var s = period/pi2 * Math.asin(1/amplitude);
			return (amplitude*Math.pow(2,-10*t)*Math.sin((t-s)*pi2/period )+1);
		}
	};
	easings.getElasticInOut = function(amplitude,period) {
		var pi2 = Math.PI*2;
		return function(t) {
			var s = period/pi2 * Math.asin(1/amplitude);
			if ((t*=2)<1) return -0.5*(amplitude*Math.pow(2,10*(t-=1))*Math.sin( (t-s)*pi2/period ));
			return amplitude*Math.pow(2,-10*(t-=1))*Math.sin((t-s)*pi2/period)*0.5+1;
		}
	};

	easings.easeInElastic = easings.getElasticIn(1,0.3);
	easings.easeOutElastic = easings.getElasticOut(1,0.3);
	easings.easeInOutElastic = easings.getElasticInOut(1,0.3*1.5);

	easings.addElasticIn = function(name, amplitude, period) {
		easings[name] = easings.getElasticIn(amplitude, period);
	};
	easings.addElasticOut = function(name, amplitude, period) {
		easings[name] = easings.getElasticOut(amplitude, period);
	};
	easings.addElasticInOut = function(name, amplitude, period) {
		easings[name] = easings.getElasticInOut(amplitude, period);
	};



	// -------------------- bounce
	easings.easeInBounce = function(t) {
		return 1-easings.bounceOut(1-t);
	};
	easings.easeOutBounce = function(t) {
		if (t < 1/2.75) {
			return (7.5625*t*t);
		} else if (t < 2/2.75) {
			return (7.5625*(t-=1.5/2.75)*t+0.75);
		} else if (t < 2.5/2.75) {
			return (7.5625*(t-=2.25/2.75)*t+0.9375);
		} else {
			return (7.5625*(t-=2.625/2.75)*t +0.984375);
		}
	};
	easings.easeInOutBounce = function(t) {
		if (t<0.5) return easings.easeInBounce (t*2) * .5;
		return easings.easeOutBounce(t*2-1)*0.5+0.5;
	};



	// -------------------- blend
	easings.addBlend = function(name, ease1, ease2, easeMix) {
		if (easeMix === "linear") easeMix = null;

		easings[name] = function (t) {
			var v1 = easings[ease1](t);
			var v2 = easings[ease2](t);
			var vMix = t;
			if (easeMix) vMix = easings[easeMix](t);
			return v1 + (v2 - v1) * vMix;
		}
	};



	// -------------------- remove
	easings.remove = function(name) {
		delete easings[name];
	};



	// -------------------- alias
	easings.sineIn = easings.easeInSine;
	easings.sineOut = easings.easeOutSine;
	easings.sineInOut = easings.easeInOutSine;

	easings.quadIn = easings.easeInQuad;
	easings.quadOut = easings.easeOutQuad;
	easings.quadInOut = easings.easeInOutQuad;

	easings.cubicIn = easings.easeInCubic;
	easings.cubicOut = easings.easeOutCubic;
	easings.cubicInOut = easings.easeInOutCubic;

	easings.quartIn = easings.easeInQuart;
	easings.quartOut = easings.easeOutQuart;
	easings.quartInOut = easings.easeInOutQuart;

	easings.quintIn = easings.easeInQuint;
	easings.quintOut = easings.easeOutQuint;
	easings.quintInOut = easings.easeInOutQuint;

	easings.expoIn = easings.easeInExpo;
	easings.expoOut = easings.easeOutExpo;
	easings.expoInOut = easings.easeInOutExpo;

	easings.circIn = easings.easeInCirc;
	easings.circOut = easings.easeOutCirc;
	easings.circInOut = easings.easeInOutCirc;

	easings.backIn = easings.easeInBack;
	easings.backOut = easings.easeOutBack;
	easings.backInOut = easings.easeInOutBack;

	easings.elasticIn = easings.easeInElastic;
	easings.elasticOut = easings.easeOutElastic;
	easings.elasticInOut = easings.easeInOutElastic;

	easings.bounceIn = easings.easeInBounce;
	easings.bounceOut = easings.easeOutBounce;
	easings.bounceInOut = easings.easeInOutBounce;

})();
