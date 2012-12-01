Titanium.include("/aux/functions.js");

Ti.App.background = '#000';
Ti.App.color = '#fff';
Ti.App.button = 'red';
Ti.App.buttoncolor = '#000';

function ApplicationWindow(title,num) {
	var top = 10;
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:Ti.App.background
	});
	
	if(num == 1) {
		window1(self);
	} else if(num == 2) {
		window2(self);
	}
	return self;
};

function window1(winorg) {
	var win = Ti.UI.createScrollView({
		top : 0,
		left : 0,
		width: '100%',
		height: 'auto',
		backgroundColor : Ti.App.background,
	
	});
	
	var top = 10;
	createPhotoObj(win, 'img1', top, 10);
	createPhotoObj(win, 'img2', top, 110);
	createPhotoObj(win, 'img3', top, 220);
	
	top = top + 50;
	createHeader(win,top, 10, 'Pictures');

	top = top + 30;
	maptop = top;
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.distanceFilter = 0;

	function createMapLocation(e) {
		if (!e.success || e.error) {
			createLocation(win,maptop, 0, 200, Ti.App.currentlat, Ti.App.currentlng);
//			var msg = 'error: ' + JSON.stringify(e.error);
//			alert(msg);
		}
		else {
			var accuracy = e.coords.accuracy;
			var timestamp = e.coords.timestamp;
			createLocation(win,maptop, 0, 200, e.coords.latitude, e.coords.longitude);
		}
	}
	Titanium.Geolocation.getCurrentPosition(createMapLocation);

	top = top + 200;
	createHeader(win,top, 10, 'Location -> Current Address Here');
	
	top = top + 20;
	var desc1 = createTextInput(win, top, 10, 'Description');
	
	top = top + 60;
	var desc2 = createTextInput(win, top, 10, 'Why');
	
	top = top + 60;
	var submit = Titanium.UI.createLabel({top : top, left: 26, width: 100, height : 24, text: 'Submit', backgroundColor: Ti.App.button, 
 		textAlign: 'center', font : {fontSize : '16', fontWeight : 'bold', fontFamily : 'Arial'}, color: Ti.App.buttoncolor
	});
	
	submit.addEventListener('click', function(e) {
		alert("SUBMITTED");
	});

	win.add(submit);
	var cancel = Titanium.UI.createLabel({top : top, left: 150, width: 100, height : 24, text: 'Cancel', backgroundColor: Ti.App.button, 
 		textAlign: 'center', font : {fontSize : '16', fontWeight : 'bold', fontFamily : 'Arial'}, color: Ti.App.buttoncolor
	});
	
	cancel.addEventListener('click', function(e) {
		deleteImages(e.source.view);
//		desc1.value='';
	});

	win.add(cancel);

	top = top + 60;
	var but2 = Titanium.UI.createLabel({top : top, left: 26, right: 26, height : 24, text: '', 
 		textAlign: 'center', font : {fontSize : '16', fontWeight : 'bold', fontFamily : 'Arial'}
	});
	
	win.add(but2);
	
	winorg.add(win);
	
}
function window2(win) {
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.distanceFilter = 0;

	function createMapLocation(e) {
		if (!e.success || e.error) {
//			createLocation(win,0, 0, 600, Ti.App.currentlat, Ti.App.currentlng);
		}
		else {
			var accuracy = e.coords.accuracy;
			var timestamp = e.coords.timestamp;
//			createLocation(win,0, 0, 600, e.coords.latitude, e.coords.longitude);
		}
	}
	Titanium.Geolocation.getCurrentPosition(createMapLocation);

}
module.exports = ApplicationWindow;
