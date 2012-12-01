// Initialize app
Ti.App.app = 'sidewalkhazard';
Ti.App.appv = '0.10';
Ti.App.baseurl = "";
/*
Ti.App.dbversion = '0.18';
Ti.App.dbname = "contentDB" + Ti.App.dbversion;
Titanium.Database.install('sidewalkhazard.sqlite', Ti.App.dbname);
//Ti.include("/aux/functions.js");

Ti.App.uuid = Titanium.Platform.id;
var db = Titanium.Database.open(Ti.App.dbname);
var ver = db.execute("SELECT * FROM settings where id = '1' ");
var uuid = ''; // = ver.fieldByName('uuid');
if(Ti.App.uuid == '') {
	if(uuid != '') {
		Ti.App.uuid = uuid;
	} else {
		Ti.App.uuid = Titanium.Platform.createUUID();
	} 
} else if (uuid == '') {
		db.execute("UPDATE settings SET uuid = ? where id = 1", Ti.App.uuid);
}
db.close();
*/
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

var repwin = Titanium.UI.createWindow({
	title : 'Reports',
	backgroundColor : Ti.App.background,
	url : '/pages/reports.js'
});
var reptab = Titanium.UI.createTab({
	icon : '/images/KS_nav_ui.png',
	title : 'Reports',
	window : repwin
});
/////////////////////////////////////////////
var neighborwin = Titanium.UI.createWindow({
	title : 'Incidents',
	backgroundColor : Ti.App.background,
	url : '/pages/neighbor.js'
});
var neighbortab = Titanium.UI.createTab({
	icon : '/images/KS_nav_ui.png',
	title : 'Incidents',
	window : neighborwin
});


tabGroup.addTab(reptab);
tabGroup.addTab(neighborwin);

// open tab group
tabGroup.open();