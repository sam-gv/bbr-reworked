include("js/game/NPC.js");
var Friendly = NPC.extend({
	
constructor : function(width, height, posX, posY, sprite) {
		this.height = height;
		this.width = width;
		this.x = posX;
		this.y = posY;
		this.sprite = sprite;

	},
	
	draw : function(canvas, context, player, camera, area) {
		
			context.fillStyle = '#00FF00';
			context.fillRect(this.x, this.y, this.width, this.height);
		
	},

	update : function(framerate, player) {
		this.collide(player);
/*	
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
		}*/
	},
	collide : function(player){
		this.base(player);
	}
});