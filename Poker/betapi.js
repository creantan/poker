'use strict';

var BetApi = function() {

	this.betServer;
	this.userName = "";
	this.userID = "";
	this.roomID = "";
}

BetApi.prototype = {

	connect:function() {

		this.betServer = new Server();
		this.betServer.connect();
	},

	registerCallback:function(openCallback, closeCallback, messageCallback, errorCallback) {

		this.betServer.registerCallback(openCallback, closeCallback, messageCallback, errorCallback);
	},

	setUserID:function(strUserID) {
		this.userID = strUserID;
	},

	setRoomID:function(strRoomID) {
		this.roomID = strRoomID;
	},

	checkVersion:function(strVersion, callback) {

		var data = {version:strVersion}
		this.betServer.sendCommand(data, callback);
	},

	loginCertification:function(strName, callback) {

		var data = {mechanism:"plain", text:strName}
		this.betServer.sendCommand(data, callback);
	},

	getRoomList:function(callback) {

		var data = {type:"iq", id:"getRoomList", from:this.userID, to:"", action:"get", class: "room.list"};
		this.betServer.sendCommand(data, callback);
	},

	getRoomInfo:function(callback) {

		var data = {type:"iq", id:"getRoomInfo", from:this.userID, to:this.roomID, action:"get", class: "room.info"};
		this.betServer.sendCommand(data, callback);
	},

	getUserInfo:function(playerID, callback) {

		var data = {type:"iq", id:"getUserInfo", from:this.userID, to:playerID, action:"get", class: "user.info"};
		this.betServer.sendCommand(data, callback);
	},

	enterRoom:function(callback) {

		var data = {type:"presence", id:"enterRoom", from:this.userID, to:this.roomID, action:"join"};
		this.betServer.sendCommand(data, callback);
	},

	leaveRoom:function(callback) {

		var data = {type:"presence", id:"leaveRoom", from:this.userID, to:this.roomID, action:"gone", class:""};
		this.betServer.sendCommand(data, callback);
	},

	bet:function(number, callback) {

		var data = {type:"presence", id:"bet", from:this.userID, to:this.roomID, action:"bet", class:number};
		this.betServer.sendCommand(data, callback);
	},

	getRoomWholeStatus:function() {

		var data = {type:"iq", id:"getRoomWholeStatus", from:this.userID, to:this.roomID, action:"get", class:"state"};
		this.betServer.sendCommand(data, callback);
	}
}
