var URGL_APP = {
	
	data : {},
	
	getData : function()
	{
		$.getJSON('json/main.json', function(data)
		{
			URGL_APP.data = data;
			URGL_APP.init();
		});
	},
	
	init: function ()
	{
		console.log("app started");
		$('#nimaiwrap').animate({opacity: '1'}, 300);
	}
	
}

$(document).ready(function()
{
	URGL_APP.getData();
});