include("js/game/Door.js");
include("js/game/Block.js");
include("js/game/NPC.js");
include("js/game/Hole.js");
include("js/game/Apple.js");

var Area = Base.extend({
    constructor : function(gameRef, width, height, backgroundSrc, foregroundSrc, groundSrc, cloudsSrc) {
        this.width = width;
        this.height = height;
        this.game = gameRef;
        this.backgound = new Image();
        this.foreground = new Image();
        this.clouds = new Image();
        this.ground = new Image();

        this.groundLevel = height - 130;

        this.backgound.src = backgroundSrc;
        this.foreground.src = foregroundSrc;
        this.ground.src = groundSrc;
        this.clouds.src = cloudsSrc;

        this.doors = [];
        this.blocks = [] ;
        this.holes = [];
        this.ennemies = [];
        this.apples = [];
        this.npc = ""//[new Friendly(80, 100, 400, this.groundLevel - 200, "")];
        this.projectiles = [];

       //this.ennemies = [new Spitter(600, this.groundLevel)];

        this.ennemies = [];

       // this.ennemies.push(new Spectre(800, 200,"L"));
        this.ennemies.push(new Spitter(600, this.groundLevel ));
        this.ennemies.push(new Spitter(700, this.groundLevel ));
        this.ennemies.push(new Spitter(1000, this.groundLevel ));
        this.ennemies.push(new Spitter(2800, this.groundLevel ));
        this.ennemies.push(new Spitter(4000, this.groundLevel ));
        this.ennemies.push(new Spitter(5000, this.groundLevel ));
        this.ennemies.push(new Spitter(6500, this.groundLevel ));
        this.ennemies.push(new Spitter(8000, this.groundLevel ));
        this.ennemies.push(new Spitter(15000, this.groundLevel ));

       // this.ennemies.push(new Spectre(900, 99 , "L"));

        this.backgroundOffset = 0;
        this.foreGroundFinalOffset = 0;
        this.groundFinalOffset = 0;


        this.blocks.push(new Block(1495, this.groundLevel + 30));
        this.blocks.push(new Block(2105, this. groundLevel + 30));
        this.blocks.push(new Block(2440, this.groundLevel + 30));
        this.blocks.push(new Block(2440, this.groundLevel + 30 - 100));

        this.doors.push(new Door("town", 8400, this.groundLevel+25));
        
        this.holes.push(new Hole(2480, 185));//2670
        this.holes.push(new Hole(2900, 230));//3137
        this.holes.push(new Hole(4047, 310));//4365
        this.holes.push(new Hole(5025, 197));//5222
        this.holes.push(new Hole(6580, 247));//6827
        this.holes.push(new Hole(7035, 242));//7277
    },


    update : function(framerate, player) {
        this.backgroundOffset = player.x - 400;

        for(i in this.npc){
            this.npc[i].update(framerate, player);
        }
        for(i in this.ennemies){
            if(this.ennemies[i].hp > 0){
                this.ennemies[i].update(framerate, player);
            }     
            else {
                var spawnApple = this.ennemies[i].dropApple();
                if(spawnApple){
                    this.apples.push(new Apple(this.ennemies[i].x, this.ennemies[i].y+this.ennemies[i].height/2+30, 2));
                }
                this.ennemies.splice(i, 1);
            }      
        }

        for(i in this.doors) {
            if(this.doors[i].collide(player)) {
                alert("Level cleared ! Boss coming soon :)");
                location.reload();
                this.game.changeArea(this.doors[i]);
            }
        }

        for(i in this.holes){
            this.holes[i].collide(player);

            for(j in this.ennemies){
                this.holes[i].collideNPC(this.ennemies[j]);
            } 
        }

        for(i in this.apples){
            this.apples[i].collide(player, this);

            if(!this.apples[i].showApple){
                player.eatApple(this.apples[i].hp);
                this.apples.splice(i, 1);
            }
        }

        for(i in this.blocks) {
            this.blocks[i].collide(player, this);


            for(j in this.ennemies){
                this.blocks[i].collideNPC(this.ennemies[j], this);
            }            
        }

    	  for(i in this.projectiles) {

            if(this.projectiles[i].show) {
                this.projectiles[i].update();
            }
            else{
          		this.projectiles.splice(i, 1);	
            }
        }
    },
    
	addProjectile : function(projectile){
		this.projectiles.push(projectile); 
	},
	
   drawBackground : function(canvas, context, player, camera) {

        context.drawImage(this.backgound, -camera.halfWidth, -camera.halfHeight);

        context.drawImage(this.clouds, 0, 0);

        if(player.x < camera.halfWidth) {
            context.drawImage(this.foreground, 0, camera.height-390);
        }
        else if(player.x > this.width - camera.halfWidth - player.width/2) {
            finaloffset = this.width - camera.halfWidth - player.width/2;
            context.drawImage(this.foreground, -this.foreGroundFinalOffset, camera.height-390);
        }
        else {
            this.foreGroundFinalOffset = this.backgroundOffset/2;
            context.drawImage(this.foreground, -this.backgroundOffset/2, camera.height-390);
        }

    },

    drawProps : function(canvas, context, player, camera) {
        for(var i in this.apples){
            this.apples[i].draw(canvas, context, player, camera, this);
        }

        for(var i in this.blocks){
            this.blocks[i].draw(canvas, context, player, camera, this);
        }

        for(var i in this.npc){
            this.npc[i].draw(canvas, context, player, camera, this);
        }
        for(var i in this.ennemies){
            if(this.ennemies[i].hp > 0){
                this.ennemies[i].draw(canvas, context, player, camera, this);
            }
        }

        if(player.x < camera.halfWidth) {
            context.drawImage(this.ground, 0, camera.height-150);
        }
        else if(player.x > this.width - camera.halfWidth - player.width/2) {
            finaloffset = this.width - camera.halfWidth - player.width/2;
            context.drawImage(this.ground, -this.groundFinalOffset, camera.height-150);
        }
        else {
            this.groundFinalOffset = this.backgroundOffset;
            context.drawImage(this.ground, -this.backgroundOffset, camera.height-150);
        }

        for(i in this.doors) {
            this.doors[i].draw(canvas, context, player, camera, this);
        }
    }
});