include("js/FilthyEngine/Sound.js");

SoundManager = [];

SoundManager.load = function(fileName, soundId, loop) {
	SoundManager[""+soundId] = new Sound(fileName, soundId, loop);
}

SoundManager.play = function(soundId) {
	SoundManager[""+soundId].play();
}

SoundManager.pause = function(soundId) {
	SoundManager[""+soundId].pause();
}

SoundManager.pauseAll = function() {
	for(i in SoundManager) {
		SoundManager[""+i].pause();
	}
}

SoundManager.mute = function(soundId, value) {
	SoundManager[""+soundId].mute(value);
}

SoundManager.isMuted = function(soundId) {
	return SoundManager[""+soundId].isMuted();
}


SoundManager.muteAll = function(value) {
	for(i in SoundManager) {
		SoundManager[""+i].mute(value);
	}
}

SoundManager.setVolume = function(soundId, value) {
	SoundManager[""+soundId].setVolume(value);
}

SoundManager.getVolume = function(soundId) {
	return SoundManager[""+soundId].getVolume();
}