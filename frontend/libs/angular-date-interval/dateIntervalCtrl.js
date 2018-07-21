ptcApp.controller('DateIntervalCtrl',['$scope', 'RANGE', 'SETTINGS', function ($scope, RANGE, SETTINGS) {
	var DAY = 86400000;
	var percentage;
	$scope.changeLeft 	= false;
	$scope.changeRight 	= false;
	$scope.leftDate 		= new Date(SETTINGS.get('startDate').getTime());
	$scope.rightDate 		= new Date(SETTINGS.get('endDate').getTime());
	$scope.leftInput 		= $scope.leftDate.toLocaleDateString();
	$scope.rightInput 	= $scope.rightDate.toLocaleDateString();

	/*
	Take the min and max date and split the interval into step()s.
	*/
	var getDateDiff = function (min, max) {
		return Math.floor((max.getTime()-min.getTime())/DAY);
	}

	var step = function () {
		return 100/getDateDiff(SETTINGS.get('startDate'), SETTINGS.get('endDate'));															// One step(), width percent
	}
	$scope.leftWidth 		= 0;																				// Width of the left 'unselected div'
	$scope.middleWidth 	= 100;															// Width of the middle, selected interval					
	$scope.rightWidth 	= 0;																				// Width of the right 'unselected div'

	var updateMiddleWidth = function () {
		$scope.middleWidth = 100-($scope.rightWidth+$scope.leftWidth);
		if ($scope.middleWidth < 0) {
			$scope.middleWidth = 0;
		}
		$scope.leftWidth = 100 - ($scope.middleWidth+$scope.rightWidth);	// Reset left width
	}

	/*
		Handles what happens when the sliders collide
	*/
	var prev = 0;
	var collide = function () {
		var direction = Math.sign(event.clientX-prev);
		if ($scope.middleWidth < step()) {
			if (direction < 0) {
				if ($scope.changeLeft) {}
				if ($scope.changeRight) {
					//$scope.changeRight = false;
					$scope.changeLeft = true;
				}
			} else {
				if ($scope.changeLeft) {
					$scope.changeRight = true;
				}
				if ($scope.changeRight) {
					//$scope.changeLeft = false;
				}
			}
		}
		prev = event.clientX;
	}

	/*
		Handles the graphical movement of the slider.
	*/
	var move = function () {
		//console.log(percentage);
		if ($scope.changeLeft) {
			if (percentage < 0) {
				$scope.leftWidth = 0;
				//$scope.rightWidth = 100;
			} else if (percentage > 100) {
				$scope.leftWidth = 100;
				//$scope.rightWidth = 0;
			} else {
				$scope.leftWidth = percentage;
			}
		}
		if ($scope.changeRight) {
			if (percentage < 0) {
				$scope.rightWidth = 100;
				//$scope.leftWidth = 0;
			} else if (percentage > 100) {
				$scope.rightWidth = 0;
				//$scope.leftWidth = 100;
			} else {
				$scope.rightWidth = 100-percentage;
			}
		}
		updateMiddleWidth();
	}

	/*
		DATE UPDATE
		Handles the update of the date lables.
	*/
	var updateDates = function () {
		$scope.leftDate
			.setTime(
				SETTINGS.get('startDate').getTime()+(DAY*($scope.leftWidth/step()))
			);
		$scope.rightDate
			.setTime(
				SETTINGS.get('endDate').getTime()-(DAY*($scope.rightWidth/step()))
			);
	}

	/*
		Is triggered when the user moves one of the sliders.
	*/

	$scope.sliderPercent = function (event) {
		if (event.currentTarget.className === 'date-interval-timeline') {
			percentage = ((event.clientX - event.currentTarget.offsetLeft) / event.currentTarget.clientWidth)*100;
		}
	}

	/*
		When a user moves the slider.
	*/
	$scope.moveRange = function (event) {
		collide();
		move();
		updateDates();
		$scope.leftInput = $scope.leftDate.toLocaleDateString();
		$scope.rightInput = $scope.rightDate.toLocaleDateString();
	}

	/*
		This happens on mouse up
	*/
	/*
		UPDATE RANGE
		Updates the range slider
		so it fits to the selected party
	*/
	var updateData = function () {
		var partyName = SETTINGS.get('currentParty').name;
		RANGE.getRange(partyName).then(function(data) {
			var min = new Date(data.startDate);
			var max = new Date(data.endDate);
			SETTINGS.set('startDate', min);
			SETTINGS.set('endDate', max);
		});
	}
	$scope.updateRange = function () {
		updateData();
		$scope.changeRight = false;
		$scope.changeLeft = false;
	}

	/*
		DATE INPUTS:
		All methods that handles the user input of dates.
	*/

	var validateInputRange = function (val, min, max) {
		var d = Date.parse(val);
		return (min <= d && d <= max);
	}

	/*
		Is triggered when the user inputs a value in the slider.
	*/
	$scope.setInputLeft = function (evnt, val) {
		if (evnt.which === 13) {
			//restoreMiddle();
			if (validateInputRange(val, SETTINGS.get('startDate').getTime(), $scope.rightDate.getTime())) {
				$scope.leftDate = new Date(val);
				var diff = getDateDiff(SETTINGS.get('startDate'),$scope.leftDate);
				$scope.leftWidth = (step()*diff);
				updateMiddleWidth();
				$scope.inputLeft = false;
			} else {
				$scope.leftInput = "Date out of range";
			}
		}
	}
	
	$scope.setInputRight = function (evnt, val) {
		if (evnt.which === 13) {
			//restoreMiddle();
			if (validateInputRange(val,$scope.leftDate.getTime(),SETTINGS.get('endDate').getTime())) {
				$scope.rightDate = new Date(val);
				var diff = getDateDiff($scope.rightDate,SETTINGS.get('endDate'));
				$scope.rightWidth = (step()*diff);
				updateMiddleWidth();
				$scope.inputRight = false;
			} else {
				$scope.rightInput = "Date out of range";
			}
		}
	}

	/*
		Initialize this mother fucker.
	*/

	RANGE.getRange('full').then(function(data) {
		var min = new Date(data.startDate);
		var max = new Date(data.endDate);
		console.log(data);
		SETTINGS.set('startDate', min);
		SETTINGS.set('endDate', max);
		$scope.leftDate.setTime(SETTINGS.get('startDate').getTime());
		$scope.rightDate.setTime(SETTINGS.get('endDate').getTime());
	});

}]);