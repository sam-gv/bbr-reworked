var Hole = Base.extend({
	constructor: function(x, width){
		this.x = x;
		this.width = width;
	},

	collide: function(player){


		if(player.currentDirection.indexOf("L") != -1){
			if((player.x - player.width/2) > this.x && (player.x + player.width/2) < (this.x + this.width) && player.y == player.groundY){
				player.inHole = true;
			}
		}
			
		else if(player.currentDirection.indexOf("R") != -1){
			if((player.x - player.width/2) > this.x && (player.x + player.width/2) < (this.x + this.width) && player.y == player.groundY){
				player.inHole = true;
			}
		}
	},

	collideNPC: function(npc){

		
		if (Math.abs(this.x - npc.x) < 350 && npc.isAggro){

			if(npc.currentDirection.indexOf("L") != -1){
			
				if (Math.abs(npc.x - (this.x + this.width)) <= 2){
					npc.canRunLeft = false;
				}
			}
				
			else if(npc.currentDirection.indexOf("R") != -1){

				if (Math.abs((npc.x) - this.x) <= 0){
					npc.canRunRight = false;
				}
			}
		}	
	}
});