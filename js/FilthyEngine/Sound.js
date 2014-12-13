Sound = Base.extend({
	constructor : function(fileName, soundId, loop) {
		this.soundId = soundId;
		this.fileName = fileName;
		var loopStr = loop ? "loop" : "";
		
		var sound = '<audio id='+soundId+' '+loopStr+'>' +
		  '<source src='+fileName+'.mp3 type="audio/mpeg">'+
		  '<source src='+fileName+'.ogg type="audio/ogg">'+
		  '<embed hidden="true" src='+fileName+'.mp3>'+
		'</audio>'
		
		$(sound).appendTo('body');
		this.soundDOM = document.getElementById(this.soundId);
	},
	
	play : function() {
		this.soundDOM.play();
	},
	
	pause : function() {
		this.soundDOM.pause();
	},
	
	/**
	param value: true or false wether you want to mute or unmute the sound
	*/
	mute : function(value) {
		this.soundDOM.muted = value;
	},
	
	/**
	return wether or not the sound is muted
	*/
	isMuted : function() {
		return this.soundDOM.muted;
	},
	
	/**
	param value: 0 to 1 where 1 is the highest volume and 0 is mute
	*/
	setVolume : function(value) {
		this.soundDOM.volume = value;
	},
	
	/**
	return the current volume from 0 to 1
	*/
	getVolume : function() {
		return  this.soundDOM.volume;
	}
});