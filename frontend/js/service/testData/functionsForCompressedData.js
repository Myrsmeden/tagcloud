/* This code is not used for the moment but it should be saved in case we deside to use the compressed hashtag data.
Use this functions in a service if the data loads slowly and ask the backend team to adjust the api.*/


/* Calculates number of days between two dates.
	INPUT: 	firstDate = <timestamp>
			secondDate = <timestamp>
	Output: diffDays = <integer> describing the number of days between two date.
	I.e firstDate = 2000-1-1 and secondDate = 2000-1-2 then diffDays = 1.
	*/
	this.getNumberOfDays = function (firstDate, secondDate) {	
		var oneDay = 24*60*60*1000;	// hours*minutes*seconds*milliseconds
		var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
		return diffDays;
	}


	/* Generates the array index for hashdays for the first and last day based on the timeline slider.
	OUTPUT: {startIndex, endIndex}
	*/
	this.getTimeInterval = function () {
		var minDate 			= ptcSettings.getMinDate();
		var startDate 			= ptcSettings.getStartDate();
		var endDate 			= ptcSettings.getEndDate();
		var startIndex 			= this.getNumberOfDays(minDate, startDate);
		var endIndex			= this.getNumberOfDays(minDate, endDate);
		return {startIndex, endIndex};
	}

	/*	Modify Server Data
		Modify the data that comes from the server
		to fit the input data requirements of
		the tag cloud. Currently not in use. 
		INPUT: All the data from the server in compressed format.

		OUTPUT: Data for the tag cloud for a specefc time interval.
	*/
	this.modifyCompressedServerData = function () {
		// Get server Data...
		serverData;
		var selectedParty 		= ptcSettings.getSelectedParty();
		var cloudData 			= [];
		var timeLineStartDate 	= ptcSettings.getStartDate();
		var timeLineEndDate 	= ptcSettings.getEndDate();
		var timeInterval 		= this.getTimeInterval()
		var numberOfDays 		= timeInterval.endIndex-timeInterval.startIndex;
		
		
		for (var i = 0; i < serverData.length; i++) {
			/* Searches through the serverData and selects the object maching selected party. */
			if (serverData[i].name == selectedParty) {
				var meanWeight 	= [];
				var hashtags 	= serverData[i].hashtags;
				var days 		= serverData[i].days;

				/* Filling meanWeight with zeros*/
				for (var i = 0; i < days[0].length; i++) {
					meanWeight.push(0);
				};

				/* Checks if the days are in the time intervall and adds the weight for 
				a the hashtags for each day and puts it to meanWeight */
				for (var i = 0; i < days.length; i++) {
					if (i>=timeInterval.startIndex && i<=timeInterval.endIndex) {
						var day = days[i];
					for (var hashtag = 0; hashtag < day.length; hashtag++) {
							meanWeight[hashtag] += day[hashtag];
						};	
					};
				};

				/* Divides every element in meanWeight with number of days in the interval. */
				for (var i = 0; i < meanWeight.length; i++) {
					meanWeight[i] = meanWeight[i]/numberOfDays;
				};

				/* Creates data that will be sent to the cloud. */
				for (var i = 0; i < hashtags.length; i++) {
					cloudData[i] = {text: hashtags[i].text, weight: meanWeight[i]};
				};
			};
		};
		return cloudData;
	}