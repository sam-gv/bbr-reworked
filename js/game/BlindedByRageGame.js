include("js/game/Area.js");
include("js/game/Player.js");

var BlindedByRageGame = Game.extend({
	constructor : function(cameraWidth, cameraHeight) {
		this.base(cameraWidth, cameraHeight);
        this.areas = [];
        this.currentArea = "";
        this.addArea("main", new Area(this, 9500, cameraHeight, location.href + "images/background.png", location.href + "images/env/trees.png", location.href + "images/Level_ground2.png", location.href + "images/clouds.png"));
        this.setArea("main");
        this.player = new Player(100, this.camera.height - 170, location.href + "images/Barb_knight_small_L.png", location.href + "images/Barb_knight_small_R.png");

        this.appleFull = new Image();
        this.appleFull.src = location.href + "images/apples/AppleFull.png";
        this.appleHalf = new Image();
        this.appleHalf.src = location.href + "images/apples/AppleHalf.png";
        this.appleEmpty = new Image();
        this.appleEmpty.src = location.href + "images/apples/AppleEmpty.png";
	},

    addArea : function(areaName, area) {
        this.areas[areaName] = area;
    },

    setArea : function(newArea) {
        this.currentArea = newArea;
    },

    changeArea : function(door) {
        this.currentArea = door.toArea;
        this.player.x = door.destX;
        this.player.y = door.destY;
    },

	draw : function(canvas, context) {
		context.fillStyle = "#666";
		context.fillRect(0, 0, canvas.width, canvas.height);

        this.areas[this.currentArea].drawBackground(canvas, context, this.player, this.camera);

        this.player.draw(canvas, context, this.camera, this.areas[this.currentArea]);

        this.areas[this.currentArea].drawProps(canvas, context, this.player, this.camera);

        this.drawPlayerLife(canvas, context);
	},

    drawPlayerLife : function(canvas, context) {
        for(var i=0;i<3;i++) {
            var img = this.appleEmpty;

            if(i == 0) {
                if(this.player.hp >= 2)
                    img = this.appleFull
                else if(this.player.hp == 1)
                    img = this.appleHalf;
            } else if(i == 1) {
                if(this.player.hp >= 4)
                    img = this.appleFull
                else if(this.player.hp == 3)
                    img = this.appleHalf;
                else
                    img = this.appleEmpty;
            } else if(i == 2) {
                if(this.player.hp >= 6)
                    img = this.appleFull
                else if(this.player.hp == 5)
                    img = this.appleHalf;
                else
                    img = this.appleEmpty;
            }
            context.drawImage(img, 20 + i*30, 20);
        }
    },

	update : function(framerate) {
       ////console.log(this.player.x)
       this.player.update(framerate, this.areas[this.currentArea]);

       this.camera.update(framerate, this.player)

       this.areas[this.currentArea].update(framerate, this.player);
	},

    keypress : function(key) {

        switch(key)
		{
		case 32: //Spacebar
            SoundManager.pause("footsteps");
			this.player.jump();
			break;
		case 37://Left arrow
            SoundManager.play("footsteps");
			this.player.mouvement = "L";
	  		break;
		case 39://Right arrow
            SoundManager.play("footsteps");
			this.player.mouvement = "R";
	 		break;
 		case 69://E
 			this.player.attack();
 			break;
	 	case 90://Z
	 		this.player.interact();
	 		break;
		default:
		 break;
		}
    },


    keyrelease : function(key) {
    	switch(key)
		{
		case 32:
			this.player.endJump();
			break;
		case 37:
            SoundManager.pause("footsteps");
			this.player.mouvementReplace("L");
	  		break;
		case 39:
            SoundManager.pause("footsteps");
			this.player.mouvementReplace("R");
	 		break;
		default:
		 break;
		}
    }
});