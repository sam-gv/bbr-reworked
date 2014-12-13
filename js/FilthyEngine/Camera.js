var Camera = Base.extend({
	constructor :function(width, height) {
		this.width =  width;
		this.height = height;
		this.halfWidth = width/2;
		this.halfHeight = height/2;
		//this.position = new Point(this.halfWidth, this.halfHeight);
        this.position = new Point(this.halfWidth, 0);
        this.deltaX = (1/8) * this.width;
        this.minTreshold = this.position.x - this.deltaX;
        this.maxTreshold = this.position.x + this.deltaX;
                
	},
	
	resize : function(width, height, world) {
		this.width =  width;
		this.height = height;
		this.halfWidth = width/2;
		this.halfHeight = height/2;
        /*
		if(this.position.x <= this.halfWidth) {
			this.position.x = this.halfWidth;
		}
		else if(this.position.x >= world.width-(this.halfWidth)) {
			this.position.x = world.width-(this.halfWidth);
		}
		if(this.position.y <= this.halfHeight) {
			this.position.y = this.halfHeight;
		}
		else if(this.position.y >= world.height-(this.halfHeight)) {
			this.position.y = world.height-(this.halfHeight);
		}
		*/
	},
	
	update : function(player) {

	},

	isInViewport : function(searchedPosition) {
		var result = calculateRelativePosition(searchedPosition);
		if(result.x >= 0 && result.y >= 0 && result.x < 2 * this.halfWidth && result.y > 2 * this.halfHeight ){
				return true;
			}
		else{
			return false;
		}
	},
	
	// returns the relative (canevas) value for an absolute point, 
	// Camera's X = 0 and Y = 0 in the middle of the canevas 
	// && canevas X = 0 ad Y = 0 are in the center of the canevas
	calculateRelativePosition : function(searchedPosition) {
		return new Point (Math.abs(searchedPosition.x - (this.position.x - this.halfWidth)),
								Math.abs(searchedPosition.y - (this.position.y - this.halfHeight))) ;

	},
	
	calculateAbsolutePosition : function(x, y) { //returns the absolute value of a Canevas Point
		return new Point(x + (this.position.x-this.halfWidth), y + (this.position.y - this.halfHeight));
	}
});