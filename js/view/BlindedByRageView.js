BlindedByRageView = CanvasView.extend({
	constructor : function (partialURL, rootId, game, callback) {
		this.base(partialURL, rootId, callback);
		this.game = game;
	},
	
	draw : function() {
		canvas = this.canvas['example_canvas'];
		context = this.context['example_canvas'];
		context.clearRect(0,0, canvas.width, canvas.height);
		this.game.draw(canvas, context);
	}
	
});