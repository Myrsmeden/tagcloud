ptcApp.factory('RANGE', function ($resource, $http, SETTINGS) {

	/*
	Returns the path from where we do
	the API call.
	*/
	var getPath = function (party) {
		switch (party) {
			case 'full':
				var rangePath = '/api/1/interval';
				break;
			default:
				var partyName = SETTINGS.getTW_ID(party.name);
				var rangePath = '/api/1/interval?account='+ partyName;
		}
		return rangePath;
	}

	/*
	Gives the maximum available range for the
	specified party.
	*/
	this.getRange = function (party) {
		var rangePath = getPath(party);
		return $http.get(rangePath).then(function (response) {
			return response.data;
		}, function () {
			return "ERROR";
		});
	}

	return this;
});