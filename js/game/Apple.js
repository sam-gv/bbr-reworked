var Apple = Base.extend({
    constructor : function(x, y, hp) {

    	this.x = x;
    	this.y = y;
    	this.width = 22;
    	this.height = 24;
    	this.hp = hp;
    	this.sprite = location.href + "images/apples/AppleFull.png";
    	this.image = new Image();
    	this.image.src = this.sprite;
    	this.showApple = true;
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

    collide : function(player, area){

    	if (Math.abs(this.x - player.x) < 100){
    		if((this.x - this.width/2) <= (player.x+25) && (player.x+25) <= (this.x + this.width/2) && ((player.y + 20) == this.y)){
    			this.showApple = false;
    		}
    	}
    }
});