include("js/game/Friendly.js");
include("js/game/Hostile.js");
var NPC = Base.extend({
	constructor : function(width, height, posX, posY, sprite) {
		this.height = height;
		this.width = width;
		this.x = posX;
		this.y = posY;
		this.sprite = sprite;
		this.hp = 100;	


        this.frameCounter = 0;
	},
	
	draw : function(canvas, context, player, camera, area) {
		
			context.fillStyle = '#FFFF00';
			context.fillRect(square.x, square.y, this.x, this.y);
		
	},

	update : function(framerate, player) {
		//	//console.log(player);
		var collisionResult = this.collide(player);
		var rand = Math.random();
		if(rand > 0.1 ){
			rand = Math.random();
			if( rand > 0.5 && this.x < 900) {	//900 is arbitrary for testing
				this.x += 1;		
				////console.log("Friendly move RIGHT");
			}
			else if(this.x > 0){
				this.x -= 1;
				////console.log("Friendly move LEFT");
			}
		}
	},
	collide : function(player) {
		if(player.y + player.height/2 < this.y+this.height/3){
			player.collidesWith(false);
        	return false;
		}
        if(player.x + (player.width/2 - 10) > this.x && player.x - (player.width/2 - 5) < this.x ) {
            if( (player.y + player.height >= this.y && player.y <= this. y) 
            || (player.y <= this.y + this.height && player.y + player.height >= this.y + this.height)){
            //    //console.log("mob "+this.y+":"+player.y+player.height);
                player.collidesWith(this);
                return this;
            }
        }
        else{
        	player.collidesWith(false);
        	return false;
        }
   }

});