var AjaxManager = Base.extend({
	constructor : function () {
	
	}
});

AjaxManager.execute = function(url, data, callback) {
	$.ajax({
		type:'POST',
		url:url,
		data:data,
		success:function(data) {
			if(callback !== undefined)
				callback(data);
		}
	});
}