var URGL_APP = {
	
	model: null,
	
	init: function () {
		debug.log("app started");


		$('#nimaiwrap').animate({ opacity: '1' }, 1200);

		this.model = JAMON.model.data;

		debug.log("Number of songs: " + this.model.songs.length);
		debug.log("My Plan Data Length: " + this.model.plans.length);

		
		

	},
	
	roundabout: function () {
		$('ul').roundabout();
	}
};