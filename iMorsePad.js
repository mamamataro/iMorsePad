$(function(){
	// $("suggest").hide();
	morse_queue = "";
	isAlphaSmall = true;
	for (key in morsedatas_alpha_small) {
		morsedatas_alpha[key] = morsedatas_alpha_small[key];
	}

	for (key in morsedatas_alpha) {
		morsedatas[key] = morsedatas_alpha[key];
	}
	for (key in morsedatas_num) {
		morsedatas[key] = morsedatas_num[key];
	}
	for (key in morsedatas_etc) {
		morsedatas[key] = morsedatas_etc[key];
	}

	$("#input-box").text("");
	var morseTouchHandler = getMorseInputHandler();
	var okTouchHandler = getOKInputHandler();
	var cancelTouchHandler = getCANCELInputHandler();
	var slchangeTouchHandler = getSLchangeInputHandler();

	$("#morseinput").bind("touchstart touchend", morseTouchHandler);
	
	// input "ton" by tap
	$("#morseinput").bind("tap", function(e){
			// ton
			morse_queue += '・ ';
	});

	// input "tu-" by swipe
	$("#morseinput").bind("swipe", function(e){
			/*
			 * //cancel same touch input if(morse_queue.length >1) { morse_queue =
			 * morse_queue.slice(0, morse_queue.length - 2); }
			 */
			// tu-
			morse_queue += 'ー ';
			isSwipe = "true";
	});
	isSwipe = "false";
	isMorseInput = false;

	$("#decision").bind("touchstart touchend", okTouchHandler);
	$("#cancel").bind("touchstart touchend", cancelTouchHandler);

	$("#slchange").bind("touchstart touchend", slchangeTouchHandler);                    
});

var morsedatas = {}
var morsedatas_alpha = {}
var isAlphaSmall = false;
var isSwipe ="false";

var morsedatas_alpha_large = {
		"・ ー ": "A",
		"ー ・ ・ ・ ": "B",
		"ー ・ ー ・ ": "C",
		"ー ・ ・ ": "D",
		"・ ": "E",
		"・ ・ ー ・ ": "F",
		"ー ー ・ ": "G",
		"・ ・ ・ ・ ": "H",
		"・ ・ ": "I",
		"・ ー ー ー ": "J",
		"ー ・ ー ": "K",
		"・ ー ・ ・ ": "L",
		"ー ー ": "M",
		"ー ・ ": "N",
		"ー ー ー ": "O",
		"・ ー ー ・ ": "P",
		"ー ー ・ ー ": "Q",
		"・ ー ・ ": "R",
		"・ ・ ・ ": "S",
		"ー ": "T",
		"・ ・ ー ": "U",
		"・ ・ ・ ー ": "V",
		"・ ー ー ": "W",
		"ー ・ ・ ー ": "X",
		"ー ・ ー ー ": "Y",
		"ー ー ・ ・ ": "Z"
}

var morsedatas_alpha_small = {
		"・ ー ": "a",
		"ー ・ ・ ・ ": "b",
		"ー ・ ー ・ ": "c",
		"ー ・ ・ ": "d",
		"・ ": "e",
		"・ ・ ー ・ ": "f",
		"ー ー ・ ": "g",
		"・ ・ ・ ・ ": "h",
		"・ ・ ": "i",
		"・ ー ー ー ": "j",
		"ー ・ ー ": "k",
		"・ ー ・ ・ ": "l",
		"ー ー ": "m",
		"ー ・ ": "n",
		"ー ー ー ": "o",
		"・ ー ー ・ ": "p",
		"ー ー ・ ー ": "q",
		"・ ー ・ ": "r",
		"・ ・ ・ ": "s",
		"ー ": "t",
		"・ ・ ー ": "u",
		"・ ・ ・ ー ": "v",
		"・ ー ー ": "w",
		"ー ・ ・ ー ": "x",
		"ー ・ ー ー ": "y",
		"ー ー ・ ・ ": "z"
}

var morsedatas_num = {
		"ー ー ー ー ー ": "0",
		"・ ー ー ー ー ": "1",
		"・ ・ ー ー ー ": "2",
		"・ ・ ・ ー ー ": "3",
		"・ ・ ・ ・ ー ": "4",
		"・ ・ ・ ・ ・ ": "5",
		"ー ・ ・ ・ ・ ": "6",
		"ー ー ・ ・ ・ ": "7",
		"ー ー ー ・ ・ ": "8",
		"ー ー ー ー ・ ": "9",
}

var morsedatas_etc = {
		"・ ・ ・ ・ ・ ・ ": "SPACE",
		"・ ー ・ ー ・ ー ": ".",
		"ー ー ・ ・ ー ー ": ",",
		"・ ・ ー ー ・ ・ ": "?",
		"・ ・ ー ー ・ ": "!",
		"・ ー ・ ー ・ ": "+",
		"ー ・ ・ ・ ・ ー ": "-",
		"ー ・ ・ ー ー ": "*",
		"ー ・ ・ ー ・ ": "/",
		"ー ・ ・ ・ ー ": "=",
		"ー ・ ー ー ・ ": "(",
		"ー ・ ー ー ・ ー ": ")",
		"・ ー ー ー ー ・ ": "\`",
		"・ ー ・ ・ ー ・ ": "\"",
		"ー ー ー ・ ・ ・ ": ":",
		"・ ー ー ・ ー ・ ": "@",
		"・ ・ ・ ・ ・ ・ ・ ・ ": "HH",
}

function getOKInputHandler(){
	return function(e){
		e.preventDefault();
		// var touch = e.touches[0];
		var touch = e.originalEvent.touches[0];
		if ((e.type == "touchend") && morsedatas[morse_queue]) {
			var tmpmsg = $("#input-box").val();
			if (morsedatas[morse_queue] == "HH") {
				var hhmsg = tmpmsg.slice(0, tmpmsg.length - 1);
				$("#input-box").val(hhmsg);
			}
			else 
				if (morsedatas[morse_queue] == "SPACE") {
					$("#input-box").val(tmpmsg + " ");
				}
				else {
					$("#input-box").val(tmpmsg + morsedatas[morse_queue]);
				}
			morse_queue = "";
			$("#suggest").text("");
			$("#suggest_num").text("");
			$("#suggest_etc").text("");
		}
	}
}

function getCANCELInputHandler(){
	return function(e){
		e.preventDefault();
		// var touch = e.touches[0];
		var touch = e.originalEvent.touches[0];
		if (e.type == "touchend") {
			morse_queue = "";
			$("#suggest").text("");
			$("#suggest_num").text("");
			$("#suggest_etc").text("");
		}
	}
}

function getSLchangeInputHandler(){
	return function(e){
		e.preventDefault();
		// var touch = e.touches[0];
		var touch = e.originalEvent.touches[0];
		if (e.type == "touchend") {
			isAlphaSmall = !isAlphaSmall;
			morsedatas_alpha = null;
			morsedatas_alpha = new Object();

			if (isAlphaSmall == true) {
				for (key in morsedatas_alpha_small) {
					morsedatas_alpha[key] = morsedatas_alpha_small[key];
					morsedatas[key] = morsedatas_alpha_small[key];
				}
			}
			else {
				for (key in morsedatas_alpha_large) {
					morsedatas_alpha[key] = morsedatas_alpha_large[key];
					morsedatas[key] = morsedatas_alpha_large[key];
				}
			}
		}
	}
}

function getMorseInputHandler(){
	// global var
	// var tX, tY = 0;
	// var sTime = 0;

	// if(isMorseInput) return;

	return function(e){
        isMorseInput = true;        
        e.preventDefault();
        // var touch = e.touches[0];
        var touch = e.originalEvent.touches[0];
        /*
		 * if (e.type == "touchstart") { tX = touch.pageX; tY = touch.pageY;
		 * sTime = (new Date()).getTime(); // morse - on
		 * reqestFunction(morse_on); } else if (e.type == "touchend") { // morse -
		 * off reqestFunction(morse_off); //ignore touchend when swipe
		 * if(isSwipe == "true") { isSwipe = "false"; return; }
		 * 
		 * var dt = (new Date()).getTime() - sTime; if (dt < 300) { // ton
		 * morse_queue += '・ '; } else if (dt > 300 && dt < 2000) { // tu-
		 * morse_queue += 'ー '; } }
		 */
		// suggest
		reqestFunction(morse_alpha_suggest);
		reqestFunction(morse_num_suggest);
		reqestFunction(morse_etc_suggest);
		reqestFunction(is_morse_suggest);
		isMorseInput = false;
	}
}

function reqestFunction(func){
	setTimeout(func, 3);
}

function morse_on(){
	$("#morseinput").attr("src", "res/morse_on.png");
}

function morse_off(){
	$("#morseinput").attr("src", "res/morse_off.png");
}

function morse_alpha_suggest(){
	var suggests = [];
	var tmpstr = "<ul>";
	for (key in morsedatas_alpha) {
		if (key.indexOf(morse_queue) == 0 && $.inArray(key, suggests) == -1) {
			suggests.push(key);
			var nextstr = key.slice(morse_queue.length - 1);
			tmpstr += "<li>" + "<strong>" + morse_queue.fontcolor("red") + "</strong>" + nextstr + " => " + morsedatas_alpha[key] + "</li>";
		}
	}
	tmpstr += "</ul>";
	// $("#suggest").text(tmpstr);
	$("#suggest").html(tmpstr);
}

function morse_num_suggest(){
	var suggests = [];
	var tmpstr = "<ul>";
	for (key in morsedatas_num) {
		if (key.indexOf(morse_queue) == 0 && $.inArray(key, suggests) == -1) {
			suggests.push(key);
			var nextstr = key.slice(morse_queue.length - 1);
			tmpstr += "<li>" + "<strong>" + morse_queue.fontcolor("red") + "</strong>" + nextstr + " => " + morsedatas_num[key] + "</li>";
		}
	}
	tmpstr += "</ul>";
	$("#suggest_num").html(tmpstr);
}

function morse_etc_suggest(){
	var suggests = [];
	var tmpstr = "<ul>";
	for (key in morsedatas_etc) {
		if (key.indexOf(morse_queue) == 0 && $.inArray(key, suggests) == -1) {
			suggests.push(key);
			var nextstr = key.slice(morse_queue.length - 1);
			tmpstr += "<li>" + "<strong>" + morse_queue.fontcolor("red") + "</strong>" + nextstr + " => " + morsedatas_etc[key] + "</li>";
		}
	}
	tmpstr += "</ul>";
	$("#suggest_etc").html(tmpstr);
}

function is_morse_suggest(){
	var suggests = [];
	for (key in morsedatas) {
		if (key.indexOf(morse_queue) == 0 && $.inArray(key, suggests) == -1) {
			suggests.push(key);
		}
	}
	if (suggests.length == 0) {
		morse_queue = "";
	}
}