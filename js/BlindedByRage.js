include("js/game/BlindedByRageGame.js");
include("js/view/BlindedByRageView.js");

BlindedByRage = FilthyEngine.extend({
	constructor : function(containerId, fullscreen, alwaysRefresh) {
		this.base(containerId, fullscreen, alwaysRefresh);
		
		
		this.game = new BlindedByRageGame(800, 600);
		/** Sound Example
			SoundManager.load("sounds/hit", 'hit_sound', true); //load(url, id, isLooping)
			SoundManager.setVolume('hit_sound', 0.3); //sets the volume in a range from 0 to 1
			SoundManager.play('hit_sound'); //play(id)
			SoundManager.pause('hit_sound'); //pause(id) really usefull for looping sounds
		*/
        SoundManager.load("sounds/breakMelo_loop", 'background_melo', true);
        SoundManager.load("sounds/footsteps", 'footsteps', true);
        SoundManager.load("sounds/swoosh", 'swoosh', false);
        SoundManager.load("sounds/jump", 'jump', false);
        SoundManager.load("sounds/moan", "moan", false);
        SoundManager.setVolume("moan", 0.3)
        SoundManager.setVolume("swoosh", 0.5)
        SoundManager.setVolume("jump", 0.2)
        SoundManager.setVolume("footsteps", 0.3)
		/** Ajax call example
         AjaxManager.execute("scriptpath/scriptname.php", {key1:'value1', key2:'value2'}, function(data){
			//callback with scripts answer passed as param
			//console.log(data);
		});
		*/
	},

	init : function() {
		this.base();
		var ref = this;
	
        this.addView('GAME',
            new BlindedByRageView('partials/game.htm', 'example_canvas', ref.game, function() {
				/* Socket events goes here
                 ref.getSocket('main').listenTo('gameMessage',  function(data) {
                 });

                 */
				ref.changeView('GAME');
                SoundManager.play('background_melo'); //play(id)
            })
        );
        this.getView('GAME').init = function() {
		
			$(document).bind("keydown", function(event) {
                ref.game.keypress(event.which);
            });
            $(document).bind("keyup", function(event) {
                ref.game.keyrelease(event.which);
            });

            $(ref.getView('GAME').rootId).bind("mousedown", function(event) {
               // ref.game.clearSquares();
            });
			
			/* Mouse Release
            $(document).bind("mouseup", function(event) {
				
            });
			*/
			
			/* Mouse movement
            $(document).bind("mousemove", function(event) {
				
            });

			/* Useful for overwriting rightclick contextmenu
            $(document).bind("contextmenu", function(event) {  
                event.preventDefault();
            });
			*/
            ref.setAlwaysRefresh(true);
        }
	},
	
	loop : function(framerate) {
		this.base(framerate);
		this.game.update(framerate);
	}
});