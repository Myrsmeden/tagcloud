//js/ctrl/partySelectCtrl.js

//Controller for patrySelection

ptcApp.controller('HomeCtrl', function ($scope, TAG_DATA, SETTINGS, RANGE) {
	/* INITIALIZE */
	$scope.loading = false;									// Init loading
	$scope.partyProperties = SETTINGS.getPartyProperties();	// Init party properties
	$scope.selected = function (partyname) {
		// Get current party
		return partyname === SETTINGS.get('currentParty').name;
	};
	
	/* UPDATE FUNCTIONS	*/
	$scope.selectParty = function (party) {
		// Execute functions when party logo is clicked
		var previousParty = SETTINGS.get('currentParty');
		if (previousParty != party) {
			SETTINGS.set('currentParty', party);	// Set selected party
			SETTINGS.setColorScheme(party);				// Change color of the cloud
			updateRange();
			updateCloudData();			// Update the cloud data
		}
		if ($scope.tutorialStep === 2) {
			$scope.tutorialStep++;
		}
	}

	/*
		UPDATE CLOUD
		Updates the data displayed in the cloud
	*/
	var updateCloudData = function () {
		$scope.loading 	= true;
		if (!SETTINGS.get('currentParty').name) {
			$scope.selectParty($scope.partyProperties['v']);
		}
		TAG_DATA.getTags().then(function (tagData) {
			var words = TAG_DATA.getCloudData(tagData);
			$scope.loading = false;
			SETTINGS.updateCloud(words);
			return tagData;
		});
	}
	/*
		Updates the range max and min date when
		a party is selected.
	*/
	var updateRange = function () {
		var party = SETTINGS.get('currentParty');
		RANGE.getRange(party).then(function(data) {
			var max = new Date(data.endDate);
			SETTINGS.set('maxRange', max);
		});
	}
	
  
  /* - - - - - - - - - - - - - - - *
   *						SLIDER             *
   * - - - - - - - - - - - - - - - */

  var DAY = 86400000;
	var percentage;
	$scope.changeLeft 	= false;
	$scope.changeRight 	= false;
	$scope.leftDate 		= new Date(SETTINGS.get('startDate').getTime());
	$scope.rightDate 		= new Date(SETTINGS.get('endDate').getTime());
	$scope.leftInput 		= $scope.leftDate.toLocaleDateString();
	$scope.rightInput 	= $scope.rightDate.toLocaleDateString();
	$scope.leftWidth 		= 0;																				// Width of the left 'unselected div'
	$scope.middleWidth 	= 100;																			// Width of the middle, selected interval					
	$scope.rightWidth 	= 0;																				// Width of the right 'unselected div'

	/*
		Initialize the range slider.
	*/

	RANGE.getRange('full').then(function(data) {
		var min = new Date("2011-01-01");															// Choosen carefully by the developers...
		var max = new Date(data.endDate);
		SETTINGS.set('startDate', min);
		SETTINGS.set('endDate', max);
		SETTINGS.set('minRange', min);
		SETTINGS.set('maxRange', max);
		$scope.leftDate.setTime(SETTINGS.get('startDate').getTime());
		$scope.rightDate.setTime(SETTINGS.get('endDate').getTime());
	});

	/* Take the min and max date and split the interval into step()s. */
	var getDateDiff = function (min, max) {
		return Math.floor((max.getTime()-min.getTime())/DAY);
	}

	var step = function () {
		return 100/getDateDiff(SETTINGS.get('minRange'), SETTINGS.get('maxRange'));															// One step(), width percent
	}
	
	/*
		Updates the width of the middle div in the range slider.
	*/																			
	var updateMiddleWidth = function () {
		$scope.middleWidth = 100-($scope.rightWidth+$scope.leftWidth);
		if ($scope.middleWidth < 0) {
			$scope.middleWidth = 0;
		}
		$scope.leftWidth = 100 - ($scope.middleWidth+$scope.rightWidth);	// Reset left width
	}

	/*
		Handles what happens when the sliders collide */
	var prev = 0;
	var collide = function (event) {
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
				SETTINGS.get('minRange').getTime()+(DAY*($scope.leftWidth/step()))
			);
		$scope.rightDate
			.setTime(
				SETTINGS.get('maxRange').getTime()-(DAY*($scope.rightWidth/step()))
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
		collide(event);
		move();
		updateDates();
		$scope.leftInput = $scope.leftDate.toLocaleDateString();
		$scope.rightInput = $scope.rightDate.toLocaleDateString();
	}

	
	SETTINGS.set('oldStartDate', new Date());					// Init value to compare with
	SETTINGS.set('oldEndDate', new Date());						// Init value to compare with
	/*
		This happens on mouse up
		Compare if range slider has changed date and update data.
	*/
	$scope.updateRangeData = function (date) {
		if ($scope.tutorialStep===4) {
			$scope.stopTutorial();
		}
		$scope.changeRight = false;
		$scope.changeLeft = false;

		if (SETTINGS.get('oldStartDate').toLocaleDateString() != $scope.leftDate.toLocaleDateString()) {
			SETTINGS.set('startDate', $scope.leftDate);
			updateCloudData();
			var oldLeft = new Date($scope.leftDate);
			SETTINGS.set('oldStartDate', oldLeft);
		}
		if (SETTINGS.get('oldEndDate').toLocaleDateString() != $scope.rightDate.toLocaleDateString()) {
			SETTINGS.set('endDate', $scope.rightDate);
			updateCloudData();
			var oldRight = new Date($scope.rightDate);
			SETTINGS.set('oldEndDate', oldRight);
		}
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
		Sets a date of a slider.
	*/
	var setDate = function(date, val, width) {
		date = new Date(val);
		var diff = getDateDiff(SETTINGS.get('minRange'), date);	
		width = (step()*(diff+1));
		updateMiddleWidth();
	}

	/*
		Is triggered when the user inputs a value in the left slider.
	*/
	$scope.setInputLeft = function (evnt, val) {
		if (evnt.which === 13) {
			//restoreMiddle();
			if (validateInputRange(val, SETTINGS.get('minRange').getTime(), $scope.rightDate.getTime())) {
				$scope.leftDate = new Date(val);
				var diff = getDateDiff(SETTINGS.get('minRange'),$scope.leftDate);
				$scope.leftWidth = (step()*(diff));
				updateMiddleWidth();
				$scope.inputLeft = false;
				updateCloudData();
			} else {
				$scope.leftInput = "Date out of range";
			}
		}
	}
	/*
		Is triggered when the user inputs a value in the right slider.
	*/
	$scope.setInputRight = function (evnt, val) {
		if (evnt.which === 13) {
			//restoreMiddle();
			if (validateInputRange(val,$scope.leftDate.getTime(),SETTINGS.get('maxRange').getTime())) {
				$scope.rightDate = new Date(val);
				var diff = getDateDiff($scope.rightDate,SETTINGS.get('maxRange'));
				$scope.rightWidth = (step()*diff);
				updateMiddleWidth();
				$scope.inputRight = false;
				updateCloudData();
			} else {
				$scope.rightInput = "Date out of range";
			}
		}
	}

	/* - - - - - - - - - - - - - - - *
   *					 TUTORIAL            *
   * - - - - - - - - - - - - - - - */
  $scope.tutorialStep = 0;

  $scope.startTutorial = function () {
  	$scope.showModal = false;
  	$scope.tutorialStep = 1;
  }

  $scope.stopTutorial = function () {
  	$scope.tutorialStep = 0;
  }

  $scope.next = function () {
  	if ($scope.tutorialStep < 4) {
  		$scope.tutorialStep++;
  	} else {
  		$scope.stopTutorial();
  	}
  }

  $scope.prev = function () {
  	if ($scope.tutorialStep > 1) {
  		$scope.tutorialStep--;
  	} else {
  		$scope.stopTutorial();
  	}
  }

  /* - - - - - - - - - - - - - - - *
   *						MODAL              *
   * - - - - - - - - - - - - - - - */

  /*
		Checks if to show Modal
	*/
	var checkModal = function () {
		if (localStorage.showModal === 'false' || sessionStorage.showModal === 'false'){
			$scope.showModal = false;
		}
		else{
			$scope.showModal = true;
		}
	};
  /*
		Shows Modal when (i) is clicked
	*/
	$scope.showInfo = function () {
		$scope.showModal = true;
		SETTINGS.clearStorage('local','showModal');
		SETTINGS.clearStorage('session','showModal');
	}
	/*
		Sets browser storage
	*/
	$scope.setStorage = function (dontShowAgain) {
		// could change name to setModal and be in service as well
		if (dontShowAgain) {
			SETTINGS.setStorage('local','showModal','false');
		}else{
			SETTINGS.setStorage('session','showModal','false');
		}
	}
	/*
		closes modal
	*/
	$scope.close = function () {
		$scope.showModal = false;
		SETTINGS.setStorage('local','allowCookie','false');
	}

	$scope.allowCookie = false;
	$scope.getCookieStorage = function () {
		if (localStorage.allowCookie === 'false') {
			$scope.allowCookie = true;
			return false;
		} else {
			return true;
		}
	}
	checkModal();


});