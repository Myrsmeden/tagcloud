ptcApp.factory('TAG_DATA', function ($resource, $http, SETTINGS) {
	
	/*
	Get the path that should be called
	from the api.
	*/
	var getPath = function() {
		var partyName = SETTINGS.get('currentParty').name;
		if (partyName) {
			var startDate = SETTINGS.get('startDate').toISOString();
			var endDate = SETTINGS.get('endDate').toISOString();
			var limit = SETTINGS.get('limit');
			var TW_ID = SETTINGS.getTW_ID(partyName);
			var tweetPath = '/api/1/tags?group='+TW_ID+'&startDate='+startDate+'&endDate='+endDate+'&limit='+limit;
			return tweetPath;
		}
	}
	/*
	Get data from the server.
	INPUT: 	party = <string> with name of political party
			interval = <> array or tuple with start date and end date
	OUTPUT: tags = <array> array with json objects containing
			twitter hashtag information
	*/
	this.getTags = function () {
		var tweetPath = getPath();
		return $http.get(tweetPath).then(function (data) {
			return data;
		});
	}	


	/*
	Takes tagData and modifies it to fit the tag cloud library.
	INPUT: Test data
	OUTPUT: cloudData
	*/

	var modifyData = function (tagData) {
		/*
		There are some issues with this function
		The data is not fitting.
		requestedInterval is not defined
		hashtag is named hastag
		*/
		var cloudData = [];
		//console.log(tagData.data);
		//console.log(tagData.data.hashtags);
		if (tagData.data.hashtags) {
			for (var i = 0; i < tagData.data.hashtags.length; i++) {
				cloudData.push({text: tagData.data.hashtags[i], weight: tagData.data.ratio[i]});
			}
		} 
		
		return cloudData;
	}


	/*
	Loops through the array cloudData and checks if the ratio between element i and i+1 are larger than 2. 
	If so, element i is modified so that the ratio is 2.
	INPUT: Sorted array in descending order
	OUTPUT: Weighed cloud data that fits better in the tag cloud.
	*/
	var weightFunction = function (cloudData) {
		var repeats = 0;
		while(repeats < 3) {
			for (var i = 0; i < cloudData.length - 1; i++) {
				var weightRatio = cloudData[i].weight/cloudData[i+1].weight;
				if(weightRatio>2) {
					cloudData[i].weight = cloudData[i+1].weight*2;
				};
			};
		repeats++;
		};
		return cloudData;
	}

	/* Get tag cloud data
	INPUT:
	OUTPUT:
	*/
	this.getCloudData = function (tagData) {
		var cloudData = modifyData(tagData);
		cloudData = weightFunction(cloudData);
		return cloudData;
	}

	return this;
});