var JAMON = 
{
	doTracking : function (pageName,reportVar,eVar,eventStr,type,prop)
	{
		debug.log("------->>>>>>>>>------onTracking, pageName:"+pageName+", reportVar: "+reportVar+", eVar:"+eVar+", eventStr:"+eventStr);              
		if (s_lbx==undefined) return;
		s_lbx.events = "";		
		for (var i = 0; i < 100; i++)
		{
			s_lbx["prop" + i] = "";
			s_lbx["eVar" + i] = "";
		}		
		s_lbx.products = "";
		s_lbx.channel = "";
		//		
		s_lbx.pageName = pageName;
		var trackVarsStr = (prop==="")?"":prop+",";
 		if (!(eVar=="" || eVar==undefined)) {
			trackVarsStr = trackVarsStr+eVar; 
	 		s_lbx[eVar]=reportVar; 
		}
 		if (!(eventStr=="" || eventStr==undefined)) {
			trackVarsStr = trackVarsStr+",events";
	 		s_lbx.linkTrackEvents=eventStr;
	 		s_lbx.events=eventStr;
		}
	 	if (trackVarsStr.length>0) s_lbx.linkTrackVars=trackVarsStr;
	  	if(prop && prop.length>0) s_lbx[prop]=reportVar;
	  	debug.log("ready to track, type:"+type+", s_lbx VVVVVV");
		debug.log(s_lbx);
		if(type == "event") void(s_lbx.t());
		else void(s_lbx.tl(this,'o',reportVar));
	},
	
	doLinkOpen: function (uri, target, name, props)
	{
		//debug.log("onLinkOpen,uri: "+uri)
		if (uri.length)
		{
			if (target=="_self") window.location = uri;
			else window.open(uri,name,props);
		}
	}
	
};

JAMON.controller = {};
JAMON.model = 
{
	data : {},
		
	getData : function()
	{
		$.getJSON(JAMON.model.dataUrl, function(data)
		{
			JAMON.model.data = data;
			if(JAMON.model.data._preload_)
			{
				JAMON.model.preloadImages();
			}
			else
			{
				JAMON.app.init();
			}
		});
	},
	
	preloadImages : function()
	{
		debug.log("preloading images");
		$.imgpreload(JAMON.model.data._preload_,
		{
			each: function()
			{
				// this = dom image object
				// check for success with: $(this).data('loaded')
				// callback executes on every image load
				debug.log("image "+$(this).attr("src") +" loaded? - " + $(this).data('loaded'));
			},
			all: function()
			{
				// this = array of dom image objects
				// check for success with: $(this[i]).data('loaded')
				// callback executes when all images are loaded
				debug.log("all images loaded " + $(this).data('loaded'));
				JAMON.app.init();
			}
		});
	},
	urlVars : function()
	{
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for (var i=0; i<hashes.length; i++)
		{
			hash = hashes[i].split("=");
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	}
};

JAMON.MATHS =
{
	project:function(num,orig_bound0,orig_bound1,new_bound0,new_bound1){
		if (orig_bound0==orig_bound1) return (num);
		if (new_bound0==new_bound1) return (new_bound1);
		var new_bound1 = new_bound1;
		// (num-orig_bound0)  :  (orig_bound1 - orig_bound0)  = (? - new_bound0)  :  (new_bound1 - new_bound0)
		return ((num-orig_bound0)*(new_bound1 - new_bound0)/(orig_bound1 - orig_bound0) + new_bound0);
	},
	clamp:function(num,bound0,bound1){
		var minB = Math.min(bound0,bound1);
		var maxB = Math.max(bound0,bound1);
		return Math.max(Math.min(num,maxB),minB);
	},
	randomInt:function(bound0,bound1,includeBounds){
		var minB = Math.min(bound0,bound1);
		var maxB = Math.max(bound0,bound1);
		var val = (Math.round (Math.random() * (maxB-minB) ) + minB);
		if (includeBounds == false) val = JAMON.maths.clamp(val,minB+1,maxB-1);
		return val; 
	},
	rangedAdd : function (originalNum, increment, range)
	{
		if (range == 0) return (originalNum + increment);
		var quotient = Math.ceil (Math.abs (increment) / (range));
		return (originalNum+increment+quotient*range+range)%range;
	},             
	rangedMinus : function (originalNum, decrement, range)
	{
		var increment = ( -1 ) * decrement;
		return JAMON.UTILS.rangedAdd(originalNum,increment,range);
	},
	generateRdmArray : function(numElements, origArray)
	{  
		if (origArray==null || origArray==undefined || numElements>origArray.length)
		{  
			origArray = (origArray==null || origArray==undefined)? new Array():origArray;  
			for (var i = origArray.length; numElements>i; i++){  
				origArray.push(i);  
			}  
		}                               
		var tempArray = origArray.slice(); 
		var resultArray = new Array();  
		while (tempArray.length>0 && numElements>resultArray.length){  
			var rdm = Math.floor(Math.random()*tempArray.length);  
			resultArray.push(tempArray[rdm]);  
			tempArray.splice(rdm,1);  
		}
		return resultArray;  
	}  
};

$(document).ready(function()
{
	JAMON.model.getData();
});