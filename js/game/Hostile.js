include("js/game/NPC.js");
include("js/game/Spitter.js")
include("js/game/Spectre.js")

var Hostile = NPC.extend({
	
constructor : function(posX, posY) {
		this.base(posX, posY);
		this.height = 140;
		this.width = 110;
		this.x = posX;
		this.y = posY - this.height/2 - 30;
        this.currentDirection = "L";
        this.moving = true;
        this.speed = 4;
        this.attackReach = 40;

        this.animationAttackingIndex = 0;
        this.animationIndex = 0;
        this.animation = 0;
        this.aggroRadius = 350;
	},
	
	draw : function(canvas, context, player, camera, area) {
	},

	update : function(framerate, player) {
	},
	collide : function(player){
		var colisionBool = this.base(player);
		////console.log(colisionBool);
		if(colisionBool){
			if(player.recovery == 0){
				player.takeDamage(1, this);
			}
		}
		if(player.doDamage && ( (this.y + this.height >= player.y && this.y < player.y + player.height) 
								|| (this.y <= player.y + player.height && this.y > player.y)  ) )
		{	//console.log(0);
			if(player.currentDirection.indexOf("L") != -1 && player.currentDirection.indexOf("R") == -1){
				//console.log(1);
				if((player.x - player.width/2 -  player.weapons[player.equippedWeapon].reach) <= (this.x + this.width/2) && (player.x - player.width/2 -  player.weapons[player.equippedWeapon].reach) >= (this.x - this.width/2))
				{
					//console.log("mobLeftX: "+(this.x - this.width));
					//console.log("WepLeftLimit: "+(player.x - player.width/2 -  player.weapons[player.equippedWeapon].reach));
					player.weapons[player.equippedWeapon].doDamage(this);
                	SoundManager.play("moan");
            	}
			}		
			
			else if(player.currentDirection.indexOf("R") != -1 && player.currentDirection.indexOf("L") == -1 ){
				////console.log((player.x + player.width/2) + " " + (player.weapons[player.equippedWeapon].reach + (player.x + player.width/2)) + " " + this.x + " " + (this.x - this.width/2));
				//console.log(3);
				if((player.x + player.width/2 +  player.weapons[player.equippedWeapon].reach) >= (this.x - this.width/2) 
					&& (player.x + player.width/2 +  player.weapons[player.equippedWeapon].reach) <= (this.x + this.width/2))
				{
					//console.log(4);
					player.weapons[player.equippedWeapon].doDamage(this);
                	SoundManager.play("moan");
            	}
			}
				
		}
	
	}

});