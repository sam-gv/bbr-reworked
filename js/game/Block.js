var BlockConstants = {
    image : new Image()
}

BlockConstants['image'].src = location.href + "images/env/block.png"

var Block = Base.extend({
    constructor : function(x, y) {
        this.x = x;
        this.y = y;

        this.width = 160;
        this.height = 119;
    },

    draw : function(canvas, context, player, camera, area) {
        if(player.x < camera.halfWidth) {
            context.drawImage(BlockConstants['image'], this.x - this.width/2, this.y - this.height);
        }
        else if(player.x > area.width - camera.halfWidth - player.width/2) {
            context.drawImage(BlockConstants['image'], this.x - area.width/2 + player.width/2, this.y - this.height);
        }
        else {
            var playerDistance = player.x - this.x;
            context.drawImage(BlockConstants['image'], camera.halfWidth - playerDistance - this.width/2, this.y - this.height);
        }
    },
    collide : function(player, area) {
        if (Math.abs(this.x - player.x) < 250 
        && Math.abs( (this.y + this.height/2 ) - (player.y + player.height/2)) < 400){
            if((player.x + player.width/2) > (this.x - this.width/2)-10 && (player.x + player.width/2) < (this.x + this.width/2) -10
                && (player.groundY - player.y) > this.height /2){
                    player.onBlock = true;
                   // //console.log(0);
            }

            if((player.x + player.width/2) >= (this.x - this.width/2) && (player.x - player.width/2) <= (this.x + this.width/2) ){
                       // //console.log(1);
                        player.groundY = (this.y - this.height -21);
                        player.canRunLeft = true;
                        player.canRunRight = true;
                if(player.mouvement.indexOf("R") != -1 
                    && ( (player.y + player.height) >= ( this.y)-10 )){
                    ////console.log(2);
                    player.canRunRight = false;
                }

                else if(player.mouvement.indexOf("L") != -1 
                        && ((player.y + player.height) >= ( this.y)-10 )){
                    ////console.log(3);
                    player.canRunLeft = false;
                }

                if((player.groundY - player.y) > this.height - 41 && player.onBlock){
                    ////console.log(4);
                    player.groundY = (this.y - this.height -21);
                    player.canRunLeft = true;
                    player.canRunRight = true;
                }
                    
            } else{
            player.onBlock = false;
            }

        }        
    },

    collideNPC: function(npc, area){
        
        if((npc.x + npc.width/2) >= (this.x - this.width/2) && (npc.x - npc.width/2) <= (this.x + this.width/2) ){
            npc.canRunLeft = true;
            npc.canRunRight = true;
            if(npc.currentDirection.indexOf("R") != -1){
                npc.canRunRight = false;
            }

            else if(npc.currentDirection.indexOf("L") != -1){
                npc.canRunLeft = false;
            }                
        }   
    }
}); 
