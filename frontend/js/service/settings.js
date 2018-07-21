ptcApp.factory('SETTINGS', function ($resource) {
	
	/*
		General settings
	*/
	var settings = {
		'currentParty': '',
		'limit':50,
		'showModal': '',
		'startDate': new Date('2006-03-21'),
		'endDate': new Date(),
		'minRange': new Date('2006-03-21'),
		'maxRange': new Date()
	}

	/*
		Browser Storage
	*/

	this.setStorage = function (type,item,val) {
		// sets browser storage
		if (type === 'local') {
			localStorage[item] = val;
		};
		if (type === 'session') {
			sessionStorage[item] = val;
		};	
	}


	this.clearStorage = function (type,item) {
		// sets browser storage
		if (type === 'local') {
			localStorage.clear(item);
		};
		if (type === 'session') {
			sessionStorage.clear(item);
		};
		
	}


	this.set = function (setting, val) {settings[setting] = val;}
	this.get = function (setting) {return settings[setting];}

	/*	Property data for political parties
		currently used for design purposes	*/
	var partyProperties = {
		"v" : { 
			"name"  : "Vänsterpartiet",
 	    	"position" : 1,
	    	"hexColor" : "#ed1c24",
	    	"RGBAColor" : "rgba(237,28,36,1)",
	    	"colorScheme" : ["#760E11","#8E1015","#A51318","#BD161C","#D5191F","#ED1C23","#ED1C23"],
	    	"percentage" : 5.7,
 	    	"logo" : "res/svg/logos/vansterpartiet.svg",
 	    	"max": "",
 	    	"min" : ""
 		},		
	    "s" : { 
	    	"name"  : "Socialdemokraterna",
	 	    "position" : 2,
		    "hexColor" : "#ee3341",
		    "RGBAColor" : "rgba(238,51,65,1)",
		    "colorScheme" : ["#5F1419","#771920","#8E1E26","#A6232C","#BE2833","#D62D39","#EE3340"],
	 	    "percentage" : 31.0,
	 	    "logo" : "res/svg/logos/socialdemokraterna.svg",
	 	    "max": "",
 	    	"min" : ""
	 	},
	    "mp" : {
	    	"name"  : "Miljöpartiet",
	 	    "position" : 3,
		    "hexColor" : "#00ae4d",
		    "RGBAColor" : "rgba(0,174,77,1)",
		    "colorScheme" : ["#00451F","#005727","#00682E","#007936","#008B3E","#009C46","#00AE4E"],
	 	    "percentage" : 6.9,
	 	    "logo" : "res/svg/logos/miljopartiet.svg",
	 	    "max": "",
 	    	"min" : ""
 		},
	    "sd" : { 
 	    	"name"  : "Sverigedemokraterna",
	 	    "position" : 4,
		    "hexColor" : "#fac715",
		    "RGBAColor" : "rgba(250,199,21,1)",
		    "colorScheme" : ["#645008","#7D640A","#96780C","#AF8C0E","#C8A010","#E1B412","#FAC815"],
	 	    "percentage" : 12.9,
	 	    "logo" : "res/svg/logos/sverigedemokraterna.svg",
	 	    "max": "",
 	    	"min" : ""
	 	},
	    "c" : {
	    	"name"  : "Centerpartiet",
	 	    "position" : 5,
		    "hexColor" : "#00984f",
		    "RGBAColor" : "rgba(0,152,79,1)",
		    "colorScheme" : ["#003C1F","#004C27","#005B2F","#006A37","#00793F","#008847","#00984F"],
	 	    "percentage" : 6.1,
	 	    "logo" : "res/svg/logos/centerpartiet.svg",
	 	    "max": "",
 	    	"min" : ""
 		}, 
	    "l" : {
	    	"name"  : "Liberalerna",
	 	    "position" : 6,
		    "hexColor" : "#0097d7",
		    "RGBAColor" : "rgba(0,151,215,1)",
		    "colorScheme" : ["#003C56","#004B6B","#005A81","#006996","#0078AC","#0087C1","#0097D7"],
	 	    "percentage" : 5.4,
	 	    "logo" : "res/svg/logos/liberalerna.svg",
	 	    "max": "",
 	    	"min" : ""
	 	}, 
	    "kd" : { 
	    	"name"  : "Kristdemokraterna",
	 	    "position" : 7,
		    "hexColor" : "#005baa",
		    "RGBAColor" : "rgba(0,91,170,1)",
		    "colorScheme" : ["#002444","#002D55","#003666","#003F77","#004888","#005199","#005BAA"],
	 	    "percentage" : 4.6,
	 	    "logo" : "res/svg/logos/kristdemokraterna.svg",
	 	    "max": "",
 	    	"min" : ""
	 	},
	    "m" : { 
	    	"name"  : "Moderaterna",
	 	    "position" : 8,
		    "hexColor" : "#63b2e7",
		    "RGBAColor" : "rgba(99,178,231,1)",
		    "colorScheme" : ["#27475C","#315973","#3B6A8A","#457CA1","#4F8EB8","#59A0CF","#63B2E7"],
	 	    "percentage" : 23.3,
	 	    "logo" : "res/svg/logos/moderaterna.svg",
	 	    "max": "",
 	    	"min" : ""
	 	} 
     }
    /*
	Settings for the tag cloud.
	*/
	var tagCloudSettings = {
		/* Sets the delay time between each word that are placed out in the view */
		'animationDelay':10,
		/* Determine how many differnt sizes the words in the cloud should have */
		'steps'	:10,
		/* Determine the size of the largest and smallest word in the cloud */
		'fontSize'		:{'from':0.08, 'to':0.01},

		'colors'		:[],
		'limit'			: 50
	}

	var twitterID = {
		"Moderaterna" : {
	        "users" : [
	            19226961
	        ]
	    },
	    "Socialdemokraterna": {
	        "users": [
	            3801501
	        ]
	    },
	    "Vänsterpartiet": {
	        "users": [
	            17233550
	        ]
	    },
	    "Miljöpartiet": {
	        "users": [
	            18124359
	        ]
	    },
	    "Sverigedemokraterna": {
	        "users": [
	            97878686
	        ]
	    },
	    "Liberalerna": {
	        "users": [
	            18687011
	        ]
	    },
	    "Kristdemokraterna":{
	        "users": [
	            19014898
	        ]
	    },
	    "Centerpartiet": {
	        "users": [
	            3796501
	        ]
	    }
	}

	this.getTW_ID = function (partyname) {
		return twitterID[partyname]['users'][0];
	}

    /*	Get party properties, change to getPartyProperty
    INPUT: 	none
    OUTPUT: partyProperties
    */
	this.getPartyProperties = function () {
		return partyProperties;
	}

	this.setPartyProperty = function (party, property, value) {
		partyProperties[party][property] = value;
	}

	//
	//	Tag Cloud Settings
	//

	this.updateCloudInterval = function (words) {
		jQuery('#jqcloud').jQCloud('update', words);
	}

	this.updateCloud = function (words) {
  		// updates tag cloud with current attributes
  		jQuery('#jqcloud').jQCloud('destroy');
  		
  		jQuery('#jqcloud').jQCloud(words, {
  			autoResize: false,
  			colors: 	tagCloudSettings['colors'], 
  			delay: 		tagCloudSettings['animationDelay'],
  			fontSize: 	tagCloudSettings['fontSize'], 
  			steps: 		tagCloudSettings['steps']});
  	}

	//
	//	Tag Cloud Colors
	//

	/*
	Set color scheme for the tag cloud.
	*/
	this.setColorScheme = function (party) {
		tagCloudSettings['colors'] = party.colorScheme;
	}

	this.getSetting = function (setting) {
		return tagCloudSettings[setting];
	}

	return this;
});