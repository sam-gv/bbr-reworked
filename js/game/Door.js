var Door = Base.extend({
    constructor : function(toArea, x, y, destX, destY) {
        this.toArea = toArea;
        this.x = x;
        this.y = y;

        this.destX = destX;
        this.destY = destY;

        this.image = new Image();
        this.image.src = location.href + "images/env/area_door.png"
        this.width = 121;
        this.height = 300;

    },
    /*
    goTo : function() {
        ??? in Area maybe
    },
*/
    draw : function(canvas, context, player, camera, area) {
        if(player.x < camera.halfWidth) {
            context.drawImage(this.image,
                this.x - this.width/2,
                this.y - this.height);
        }
        else if(player.x > area.width - camera.halfWidth - player.width/2) {
            context.drawImage(this.image,
                this.x - area.width/2 + player.width/2,
                this.y - this.height);
        }
        else {
            var playerDistance = player.x - this.x;
            context.drawImage(this.image,
                camera.halfWidth - playerDistance - this.width/2,
                this.y - this.height);
        }
    },

    collide : function(player) {
        if(player.x + player.width/2 > this.x && player.x - player.width/2 < this.x + this.width) {
            if(player.y >= this.y - this.height)
                return true;
        }
        return false;
    }
});