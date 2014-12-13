include("js/game/NPC.js");

var SpitterConstants = {
    idleImages : [],
    moveImages : [],
    attackImages : [],
    hitImages : [],
    IDLE : 0,
    MOVE : 1
}
SpitterConstants['idleImages']['L'] = new Image();
SpitterConstants['idleImages']['L'].src = location.href + "images/spitters/spitterStandingLeft.png";

SpitterConstants['idleImages']['R'] = new Image();
SpitterConstants['idleImages']['R'].src = location.href + "images/spitters/spitterStandingRight.png";

SpitterConstants['hitImages']['L'] = new Image();
SpitterConstants['hitImages']['L'].src = location.href + "images/spitters/spitterHitLeft.png";

SpitterConstants['hitImages']['R'] = new Image();
SpitterConstants['hitImages']['R'].src = location.href + "images/spitters/spitterHitRight.png";

SpitterConstants['moveImages']['L'] = [];
SpitterConstants['moveImages']['L'].push(new Image());
SpitterConstants['moveImages']['L'].push(new Image());
SpitterConstants['moveImages']['L'].push(new Image());
SpitterConstants['moveImages']['L'].push(new Image());
for(i in SpitterConstants['moveImages']['L']) {
    SpitterConstants['moveImages']['L'][i].src = location.href + "images/spitters/runLeft/SpitterWalk"+i+".png";
}
SpitterConstants['moveImages']['R'] = [];
SpitterConstants['moveImages']['R'].push(new Image());
SpitterConstants['moveImages']['R'].push(new Image());
SpitterConstants['moveImages']['R'].push(new Image());
SpitterConstants['moveImages']['R'].push(new Image());
for(i in SpitterConstants['moveImages']['R']) {
    SpitterConstants['moveImages']['R'][i].src = location.href + "images/spitters/runRight/SpitterWalk"+i+".png";
}
SpitterConstants['attackImages']['R'] = [];
SpitterConstants['attackImages']['R'].push(new Image());
SpitterConstants['attackImages']['R'].push(new Image());
SpitterConstants['attackImages']['R'].push(new Image());
SpitterConstants['attackImages']['R'].push(new Image());
SpitterConstants['attackImages']['R'].push(new Image());
SpitterConstants['attackImages']['R'].push(new Image());
SpitterConstants['attackImages']['R'].push(new Image());
SpitterConstants['attackImages']['R'].push(new Image());
SpitterConstants['attackImages']['R'].push(new Image());
for(i in SpitterConstants['attackImages']['R']) {
    SpitterConstants['attackImages']['R'][i].src = location.href + "images/spitters/spitterAttackRight/spitterAttack"+i+".png";
}
SpitterConstants['attackImages']['L'] = [];
SpitterConstants['attackImages']['L'].push(new Image());
SpitterConstants['attackImages']['L'].push(new Image());
SpitterConstants['attackImages']['L'].push(new Image());
SpitterConstants['attackImages']['L'].push(new Image());
SpitterConstants['attackImages']['L'].push(new Image());
SpitterConstants['attackImages']['L'].push(new Image());
SpitterConstants['attackImages']['L'].push(new Image());
SpitterConstants['attackImages']['L'].push(new Image());
SpitterConstants['attackImages']['L'].push(new Image());
for(i in SpitterConstants['attackImages']['L']) {
    SpitterConstants['attackImages']['L'][i].src = location.href + "images/spitters/spitterAttackLeft/spitterAttack"+i+".png";
}


var Spitter = Hostile.extend({
	
constructor : function(posX, posY) {
		this.height = 140;
		this.width = 110;
		this.x = posX;
		this.y = posY - this.height/2 - 50;
        this.hp = 3;
        this.currentDirection = "L";
        this.moving = true;
        this.attacking = false;
        this.dying = false;
        this.speed = 4;
        this.attackReach = 30;
        this.attackSpeed = 1.7;
        this.animationIndex = 0;
        this.animation = 0;
        this.animationFrameDamageTreshold = 3;
        this.aggroRadius = 250;
        this.isAggro = false;

        this.canRunLeft = true;
        this.canRunRight = true;

        this.hit = 0;

	},

    dropApple : function(){

        var rand = Math.floor((Math.random()*10)+1);

        if(rand <= 4){
            return true;
        }
        else {
            return false;
        }
    },
	
	draw : function(canvas, context, player, camera, area) {
        if(this.hit > 0) {
            if(player.x < camera.halfWidth) {
                context.drawImage(SpitterConstants['hitImages'][this.currentDirection],
                    this.x - this.width/2,
                    this.y);
            }
            else if(player.x > area.width - camera.halfWidth - player.width/2) {
                context.drawImage(SpitterConstants['hitImages'][this.currentDirection],
                    this.x - area.width/2 + player.width/2,
                    this.y);
            }
            else {
                var playerDistance = player.x - this.x;
                context.drawImage(SpitterConstants['hitImages'][this.currentDirection],
                    camera.halfWidth - playerDistance - this.width/2,
                    this.y );
            }
        } else {

            if(this.moving) {
                if(player.x < camera.halfWidth) {
                    context.drawImage(SpitterConstants['moveImages'][this.currentDirection][this.animationIndex],
                                        this.x - this.width/2,
                                        this.y);
                }
                else if(player.x > area.width - camera.halfWidth - player.width/2) {
                    context.drawImage(SpitterConstants['moveImages'][this.currentDirection][this.animationIndex],
                                        this.x - area.width/2 + player.width/2,
                                        this.y);
                }
                else {
                    var playerDistance = player.x - this.x;
                    context.drawImage(SpitterConstants['moveImages'][this.currentDirection][this.animationIndex],
                        camera.halfWidth - playerDistance - this.width/2,
                        this.y );
                }

            }
            else if(this.attacking){
                if(player.x < camera.halfWidth) {
                    ////console.log('atk1');
                    context.drawImage(SpitterConstants['attackImages'][this.currentDirection][this.animationIndex],
                                        this.x - this.width/2,
                                        this.y);
                }
                else if(player.x > area.width - camera.halfWidth - player.width/2) {
                    ////console.log('atk2');
                    context.drawImage(SpitterConstants['attackImages'][this.currentDirection][this.animationIndex],
                                        this.x - area.width/2 + player.width/2,
                                        this.y);
                }
                else{
                    ////console.log('atk3');
                    var playerDistance = player.x - this.x;
                context.drawImage(SpitterConstants['attackImages'][this.currentDirection][this.animationIndex],
                                    camera.halfWidth - playerDistance - this.width/2 ,
                                    this.y);
                }
            }
        }
	},

	update : function(framerate, player) {
        if(this.hit > 0) {
            this.hit -= framerate;
        } else {

             if(Math.abs(this.x - player.x) < this.aggroRadius  || this.isAggro) {
                this.isAggro = true;
               if( Math.abs((this.x - player.x)) <= this.attackReach || (this.attacking && this.animationIndex > 0 )) {
                    this.moving = false;
                    this.attacking = true;
                    ////console.log('attack!');
                    this.animation += framerate;
                    if(this.animation >= this.attackSpeed * 100) {
                        this.animationIndex++;
                        if(this.animationIndex == SpitterConstants['attackImages'][this.currentDirection].length - this.animationFrameDamageTreshold
                            && (Math.abs((this.x - player.x)) <= this.attackReach ) ) {
                            player.takeDamage(1, this);
                        }
                        if(this.animationIndex >= SpitterConstants['attackImages'][this.currentDirection].length) {
                            this.animationIndex=0;
                            attacking = false;
                            movien = true;
                        }
                        this.animation = 0;
                    }

                }
                else if (this.animationIndex == 0){
                    this.attacking = false;
                    this.moving = true;
                    this.animationIndex = 0
                }
                if(this.moving) {
                    this.animation += framerate;
                    if(this.animation >= 250) {
                        this.animationIndex++;
                        if(this.animationIndex >= SpitterConstants['moveImages'][this.currentDirection].length) {
                            this.animationIndex=0;
                        }
                        this.animation = 0;
                    }
                    if(this.x > player.x && this.canRunLeft) {
                        this.x -= this.speed;
                        this.currentDirection = "L";
                    } 
                    else if(this.x < player.x && this.canRunRight) {
                        this.x += this.speed;
                        this.currentDirection = "R";
                    }
                }
                this.collide(player);
            }
            else{
                    //patrol
                var rand = Math.random();
                if(rand > 0.01 ){
                    rand = Math.random();
                    if( rand > 0.99) {   
                        this.currentDirection = "L";
                        this.x -= this.speed;
                    } 
                    else if(rand < 0.01) {
                        this.currentDirection = "R";
                        this.x += this.speed;
                    }
                }
            }
        }
	},
	collide : function(player){
        var colisionBool = this.base(player);
        ////console.log(colisionBool);
        if(colisionBool){
            if(player.recovery == 0){
                player.takeDamage(1, this);
            }
        }
        if(player.doDamage && ( (this.y + this.height >= player.y && this.y + this.height < player.y + player.height)
            || (this.y <= player.y + player.height && this.y > player.y)  ) ){
            if(player.currentDirection.indexOf("L") != -1){
                ////console.log((player.x - player.width/2) - player.weapons[player.equippedWeapon].reach + " " + (this.x + this.width/2));

                if((player.x - player.width/2 -  player.weapons[player.equippedWeapon].reach) <= (this.x + this.width/2) 
                && (player.x - player.width/2 -  player.weapons[player.equippedWeapon].reach) >= (this.x - this.width/2)){
                    player.weapons[player.equippedWeapon].doDamage(this);
                    SoundManager.play("moan");
                    this.hit = 250;
                }
            }

            if(player.currentDirection.indexOf("R") != -1){
                ////console.log((player.x + player.width/2) + " " + (player.weapons[player.equippedWeapon].reach + (player.x + player.width/2)) + " " + this.x + " " + (this.x - this.width/2));

                if((player.x + player.width/2 +  player.weapons[player.equippedWeapon].reach) >= (this.x - this.width/2) 
                && (player.x + player.width/2 +  player.weapons[player.equippedWeapon].reach) <= (this.x + this.width/2 - 15)){
                    player.weapons[player.equippedWeapon].doDamage(this);
                    SoundManager.play("moan");
                    this.hit = 250;
                }
            }        
        }
    }

});