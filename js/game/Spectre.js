include("js/game/NPC.js");

var SpectreConstants = {
    idleImages : [],
    deathImages : [],
    IDLE : 0,
    MOVE : 1
}
SpectreConstants['idleImages']['L'] = [];
SpectreConstants['idleImages']['L']["U"] = new Image()
SpectreConstants['idleImages']['L']["D"] = new Image()
SpectreConstants['idleImages']['L']["U"].src = location.href + "images/spectre/left/up.png";
SpectreConstants['idleImages']['L']["D"].src = location.href + "images/spectre/left/down.png"

SpectreConstants['idleImages']['R'] = [];
SpectreConstants['idleImages']['R']["U"] = new Image()
SpectreConstants['idleImages']['R']["D"] = new Image()
SpectreConstants['idleImages']['R']["U"].src = location.href + "images/spectre/right/up.png";
SpectreConstants['idleImages']['R']["D"].src = location.href + "images/spectre/right/down.png";
/*
SpectreConstants['deathImages']['L'] = [];
SpectreConstants['deathImages']['L'].push(new Image());
SpectreConstants['deathImages']['L'].push(new Image());
SpectreConstants['deathImages']['L'].push(new Image());
SpectreConstants['deathImages']['L'].push(new Image());
for(i in SpectreConstants['deathImages']['L']) {
    SpectreConstants['deathImages']['L'][i].src = location.href + "images/spectre/runLeft/SpitterWalk"+i+".png";
}
SpectreConstants['deathImages']['R'] = [];
SpectreConstants['deathImages']['R'].push(new Image());
SpectreConstants['deathImages']['R'].push(new Image());
SpectreConstants['deathImages']['R'].push(new Image());
SpectreConstants['deathImages']['R'].push(new Image());
for(i in SpectreConstants['deathImages']['R']) {
    SpectreConstants['deathImages']['R'][i].src = location.href + "images/spectre/runRight/SpitterWalk"+i+".png";
}*/
var Spectre = Hostile.extend({
	
    constructor : function(posX, posY, curDir) {
		this.height = 62;
		this.width = 58;
		this.x = posX ;
		this.y = posY - this.height/2 - 50;
        this.hp = 1;
        this.currentDirection = curDir;
        this.currentOrientation = "D";
        this.moving = true;
        this.attacking = false;
        this.speed = 6;
        this.attackReach = 100;
        this.attackSpeed = 1.7;
        this.animationIndex = 0;
        this.animation = 0;
        this.animationFrameDamageTreshold = 3
        this.aggroRadius = 900;
        this.isAggro = false;
        this.minHeight = 370;
        this.maxHeight = 100;
	},
	
    dropApple : function(){

        return false;
    },

	draw : function(canvas, context, player, camera, area) {
        if(this.moving || this.attacking) {
            if(player.x < camera.halfWidth) {
                context.drawImage(SpectreConstants['idleImages'][this.currentDirection][this.currentOrientation],
                 					this.x - this.width/2,
                  					this.y);
            }
            else if(player.x > area.width - camera.halfWidth - player.width/2) {
                context.drawImage(SpectreConstants['idleImages'][this.currentDirection][this.currentOrientation],
                 					this.x - area.width/2 + player.width/2,
                 					this.y);
            }
            else {
                var playerDistance = player.x - this.x;
                context.drawImage(SpectreConstants['idleImages'][this.currentDirection][this.currentOrientation],
                	camera.halfWidth - playerDistance - this.width/2,
                	this.y );
            }

        }

	},

	update : function(framerate, player) {
        if(Math.abs(this.x - player.x) < this.aggroRadius  || this.isAggro) {
            this.isAggro = true;
        //if(Math.abs((this.x - player.x)) <= this.attackReach || (this.attacking && this.animationIndex > 0 )) {
        	//this.moving = false;
        	//this.attacking = true;
        //}
        if(this.moving) {
            if(this.currentDirection == "L") {
                this.x -= this.speed;
                if(this.currentOrientation == "U") {
                        this.y -= this.speed;
                } else if(this.y < this.minHeight){
                        this.y += this.speed;
                        //this.currentOrientation = "D";
                }
            } else {
                 this.x += this.speed;
                if(this.currentOrientation == "U") {
                        this.y -= this.speed;
                } else if(this.y < this.minHeight){
                        this.y += this.speed;
                }
            }
            if(this.x - this.width/2  < player.x - player.width/2 - 50 && this.currentDirection == 'L')
            {
                this.currentDirection = 'R';
            }
            else if(this.x + this.width/2  > player.x + player.width/2 + 50 && this.currentDirection == 'R') {
                this.currentDirection = 'L';
            }
            if(this.y > player.y + player.height/3){
                this.currentOrientation = 'U';
            }
            else{
                this.currentOrientation = 'D';
            }
        } /*else if(this.attacking) {
            if(this.x < player.x - 40) {
                this.x+=this.speed;
                this.currentDirection = "R";
            } else if(this.x > player.x + 40) {
                this.x-=this.speed;
                this.currentDirection = "L";
            }
            if(this.x > player.x - player.width/2
            && this.x < player.x + player.width/2) {
                this.y += this.speed;
            } else {
                //this.y -= this.speed;
            }
        }*/
        this.collide(player);
    }
	},

	collide : function(player){
		this.base(player);
	}

});