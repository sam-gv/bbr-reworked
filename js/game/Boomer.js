include("js/game/NPC.js");
var BoommerConstants = {
    idleImages : [],
    moveImages : [],
    attackImages : [],
    IDLE : 0,
    MOVE : 1
}
BoommerConstants['idleImages']['L'] = new Image();
BoommerConstants['idleImages']['L'].src = location.href + "images/boomers/standbyLeftBig.png";

BoommerConstants['idleImages']['R'] = new Image();
BoommerConstants['idleImages']['R'].src = location.href + "images/boomers/standbyRightBig.png";

BoommerConstants['moveImages']['L'] = [];
BoommerConstants['moveImages']['L'].push(new Image());
BoommerConstants['moveImages']['L'].push(new Image());
BoommerConstants['moveImages']['L'].push(new Image());
BoommerConstants['moveImages']['L'].push(new Image());
BoommerConstants['moveImages']['L'].push(new Image());
for(i in BoommerConstants['moveImages']['L']) {
    BoommerConstants['moveImages']['L'][i].src = location.href + "images/boomers/runLeft/SlugWalkBig"+i+".png";
}
BoommerConstants['moveImages']['R'] = [];
BoommerConstants['moveImages']['R'].push(new Image());
BoommerConstants['moveImages']['R'].push(new Image());
BoommerConstants['moveImages']['R'].push(new Image());
BoommerConstants['moveImages']['R'].push(new Image());
BoommerConstants['moveImages']['R'].push(new Image());
for(i in BoommerConstants['moveImages']['R']) {
    BoommerConstants['moveImages']['R'][i].src = location.href + "images/boomers/runRight/SlugWalkBig"+i+".png";
}
BoommerConstants['attackImages']['R'] = [];
BoommerConstants['attackImages']['R'].push(new Image());
BoommerConstants['attackImages']['R'].push(new Image());
BoommerConstants['attackImages']['R'].push(new Image());
BoommerConstants['attackImages']['R'].push(new Image());
BoommerConstants['attackImages']['R'].push(new Image());
BoommerConstants['attackImages']['R'].push(new Image());
for(i in BoommerConstants['attackImages']['R']) {
    BoommerConstants['attackImages']['R'][i].src = location.href + "images/boomers/slugAttackRight/SlugAttack"+i+".png";
}
BoommerConstants['attackImages']['L'] = [];
BoommerConstants['attackImages']['L'].push(new Image());
BoommerConstants['attackImages']['L'].push(new Image());
BoommerConstants['attackImages']['L'].push(new Image());
BoommerConstants['attackImages']['L'].push(new Image());
BoommerConstants['attackImages']['L'].push(new Image());
BoommerConstants['attackImages']['L'].push(new Image());
for(i in BoommerConstants['attackImages']['L']) {
    BoommerConstants['attackImages']['L'][i].src = location.href + "images/boomers/slugAttackLeft/SlugAttack"+i+".png";
}



var Boomer = Hostile.extend({
	
constructor : function(posX, posY) {
		this.height = 140;
		this.width = 110;
		this.x = posX;
		this.y = posY - this.height/2 - 30;
        this.currentDirection = "L";
        this.moving = true;
        this.attacking = false;
        this.speed = 4;
        this.attackReach = 20;

        this.animationIndex = 0;
        this.animation = 0;
	},
	
	draw : function(canvas, context, player, camera, area) {
        if(this.moving) {
            if(player.x < camera.halfWidth) {
                context.drawImage(BoommerConstants['moveImages'][this.currentDirection][this.animationIndex],
                 					this.x - this.width/2,
                  					this.y);
            }
            else if(player.x > area.width - camera.halfWidth - player.width/2) {
                context.drawImage(BoommerConstants['moveImages'][this.currentDirection][this.animationIndex],
                 					this.x - area.width/2 + player.width/2,
                 					this.y);
            }
            else {
                var playerDistance = player.x - this.x;
                context.drawImage(BoommerConstants['moveImages'][this.currentDirection][this.animationIndex],
                	camera.halfWidth - playerDistance - this.width/2,
                	this.y);
            }

        }
        else if(this.attacking){
        	if(player.x < camera.halfWidth) {
        		//console.log('atk1');
        		context.drawImage(BoommerConstants['attackImages'][this.currentDirection][this.animationIndex],
                 					this.x - this.width/2,
                  					this.y);
        	}
        	else if(player.x > area.width - camera.halfWidth - player.width/2) {
        		//console.log('atk2');
        		context.drawImage(BoommerConstants['attackImages'][this.currentDirection][this.animationIndex],
                 					this.x - area.width/2 + player.width/2,
                 					this.y-10);
            }
            else{
            	//console.log('atk3');
            	var playerDistance = Math.abs(player.x - this.x);
        	context.drawImage(BoommerConstants['attackImages'][this.currentDirection][this.animationIndex],
        						camera.halfWidth - this.width/2 - 90,
        						this.y-10);
            }
        }

	},

	update : function(framerate, player) {
        if(Math.abs((this.x - player.x)) < this.attackReach){
        	this.moving = false;
        	this.attacking = true;

        	//console.log('attack!');
        	this.animation += framerate;
        	if(this.animation >= 250) {
                this.animationIndex++;
                if(this.animationIndex >= BoommerConstants['attackImages'][this.currentDirection].length) {
                    this.animationIndex=0;
                }
                this.animation = 0;
            }

        }
        else{
        	this.attacking = false;
        	this.moving = true;
        	this.animationIndex = 0
        }
        if(this.moving) {
            this.animation += framerate;
            if(this.animation >= 250) {
                this.animationIndex++;
                if(this.animationIndex >= BoommerConstants['moveImages'][this.currentDirection].length) {
                    this.animationIndex=0;
                }
                this.animation = 0;
            }
            if(this.x > player.x) {
                this.x -= this.speed;
                this.currentDirection = "L";
            } else {
                this.x += this.speed;
                this.currentDirection = "R";
            }
        }
        this.collide(player);
	},
	collide : function(player){
		this.base(player);
	}

});