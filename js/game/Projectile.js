var Projectile = Base.extend({
    constructor : function(x, y, direction, creator) {

    	this.x = x;
    	this.y = y;
    	this.width = 22;
    	this.height = 24;
    	this.direction = direction;    
    	this.sprite = ""
    	this.image = new Image();
    	this.image.src = this.sprite;
    	this.show = true;
    	this.durationMax = 4000;
    },

    draw : function(canvas, context, player, camera, area) {

        if(player.x < camera.halfWidth) {
            context.drawImage(this.image, this.x - this.width/2, this.y);
        }
        else if(player.x > area.width - camera.halfWidth - player.width/2) {
            context.drawImage(this.image, this.x - area.width/2 + player.width/2, this.y);
        }
        else {
            var playerDistance = player.x - this.x;
            context.drawImage(this.image, camera.halfWidth - playerDistance - this.width/2, this.y);
        }
    },

    collide : function(enemy, area){

    	if (Math.abs(this.x - enemy.x) < 100){
    		if((this.x - this.width/2) <= (enemy.x+25) && (enemy.x+25) <= (this.x + this.width/2) && ((enemy.y + 20) == this.y)){
    			this.show = false;
    		}
    	}
    },
    update : function(framerate, player, area){
//0:show and move, duration 4 sec
//1 : trouver moyen simple identifier les bons targets et seulement dans range x pixels de rayon pour éviter le gapillage de calcul    	
//TODO, écrire behaviour des AttackArc, gérer leur collisions, effets, créer projectile 2 des prochains ennemis, des tower à la castlevania
		if(this.direction == "R"){
			
		}    	
		else if(this.direction == "L"){
			
		}
		
    }
});