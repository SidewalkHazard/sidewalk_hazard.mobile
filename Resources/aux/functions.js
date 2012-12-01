Ti.App.imgdir = Titanium.Filesystem.applicationDataDirectory;

// http://developer.appcelerator.com/question/13851/can-photos-be-resized-on-the-device - image resize
var currentimage;
function createPhotoObj(view, name, x, y) {
	var jsfile = Titanium.Filesystem.getFile(Ti.App.imgdir, name + ".jpg");
	if (jsfile.exists()) {
		var im = Ti.App.imgdir + name + ".jpg";
	} else {
		var im = "/images/add-photo-icon.png"
	}
	var image = Titanium.UI.createImageView({
		image : im,
		name : name,
		width : 54,
		height : 54,
		top : x,
		left : y
	});
	image.addEventListener('click', function(e) {
		currentimage = e.source;
		var a = Titanium.UI.createAlertDialog({
			title : 'Add Photo',
			message : 'Select option below',
			buttonNames : ['Camera', 'Gallery', 'Cancel']
		});
		a.show();
		a.addEventListener('click', function(e) {
			if (e.index == 0) {
				doCamera();
			} else if (e.index == 1) {
				doGallery();
			} else {

			}
		});
	});
	view.add(image);
}

function doCamera() {
	Titanium.Media.showCamera({
		success : function(event) {
			var cropRect = event.cropRect;
			var image = event.media;

			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				var n = currentimage.name + '.jpg';
				saveImageFile(Ti.App.imgdir, n, event.media);
				currentimage.image = Ti.App.imgdir + n;
			} else {
				alert("got the wrong type back =" + event.mediaType);
			}
		},
		cancel : function() {
		},
		error : function(error) {
			// create alert
			var a = Titanium.UI.createAlertDialog({
				title : 'Camera'
			});

			// set message
			if (error.code == Titanium.Media.NO_CAMERA) {
				a.setMessage('Please run this test on device');
			} else {
				a.setMessage('Unexpected error: ' + error.code);
			}

			// show alert
			a.show();
		},
		saveToPhotoGallery : true,
		allowEditing : true,
		mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
	});
}

function doGallery() {
	Titanium.Media.openPhotoGallery({
		success : function(e) {
			var n = currentimage.name + '.jpg';
			saveImageFile(Ti.App.imgdir, n, e.media);
			currentimage.image = Ti.App.imgdir + n;
		},
		cancel : function() {
		},
		error : function(error) {
			mysimpleAlert("","Error with using image");
		},
		allowEditing : true
	});
}

function saveImageFile(path, filename, data) {
	if (Ti.Platform.osname != 'android') {
		var data = data.imageAsResized(400, 400);
	}
	var dir = Titanium.Filesystem.getFile(path);
	Ti.API.info("DIR: " + dir.nativePath + " FILE: " + filename);
	var newFile = Titanium.Filesystem.getFile(dir.nativePath, filename);
	newFile.write(data);
//	var f = Titanium.Filesystem.getFile(dir.nativePath, filename);
	Ti.API.info("SIZE: " + newFile.size);
}

function pictFileCopy(f1, f2) {
	var dir = Titanium.Filesystem.getFile(Ti.App.imgdir);
	var file1 = Titanium.Filesystem.getFile(dir.nativePath, f1);
	Ti.API.info("Inside pictFileCopy: " + f1 + "=>" + f2 + " File1 exists: " + file1.exists());
	if(file1.exists() ) {
		Ti.API.info("Writing File: " + f1 + "=>" + f2);
		var newFile = Titanium.Filesystem.getFile(dir.nativePath,f2);
		newFile.write(file1.read());
	}
}

function createHeader(win,x, y, t) {
	var label = Titanium.UI.createLabel({top: x, left: y, height : 20, width: 'auto', text: t, 
 		color: Ti.App.color,	font : {fontSize : '14', fontWeight : 'bold', fontFamily : 'Arial'}
 		});
 	win.add(label);
 	return (label);
}
function mysimpleAlert(title, message) {
	var a = Titanium.UI.createAlertDialog({
		title : title,
		message : message,
		buttonNames : ['OK']
	});
	a.show();
}

function createLocation (win, x, y, h, lat, lng) {
	var data = [];
	
	var homemarker = Titanium.Map.createAnnotation({
		latitude: lat,
		longitude: lng,
		title: 'Home',
		pincolor:Titanium.Map.ANNOTATION_BLUE,
		animate:true,
		draggable: true
	});
	data.push(homemarker);

	mapview = Titanium.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		region: {latitude: lat, longitude: lng, 
				latitudeDelta:.004, longitudeDelta:.004},
		animate:true,
		regionFit:true,
		userLocation:true,
		annotations: data,
		top: x, left: y,
		height: h,
		userlocation: true
	});
	mapview.addEventListener('complete', function(e) {
//		e.source.getCenter();
//		alert("CHANGE");
	});

	win.add(mapview);
}

function myHideKeyboard(label) {
	if(Titanium.Platform.osname=='android'){
		label.focus();
		label.blur();
//		Ti.UI.Android.hideSoftKeyboard(true);
	}
}

function createTextInput(win,x,y,hintText) {
	var label = Ti.UI.createTextField({
		top : x,
		left : y,
		height : 'auto',
		right: 10,
		hintText : hintText,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType : Ti.UI.RETURNKEY_DONE
	});
	win.add(label);
	return(label);
}

function deleteImages(view) {
	var win = Titanium.UI.currentWindow;
	var path = Ti.App.imgdir;
	var str = "Delete Files (" + path + "): ";
//	alert(str);
	Ti.API.info(str);
	var d = Titanium.Filesystem.getFile(path);
	var dir = d.getDirectoryListing();
	for ( j = 0; j < dir.length; j++) {
		var f = Titanium.Filesystem.getFile(path, dir[j]);
		f.deleteFile();
	}
//	view.updateLayout({top:0, left:0});
}
