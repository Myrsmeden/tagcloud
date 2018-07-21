ptcApp.factory('ptcGenerateTestData', function ($resource, ptcSettings) {

	/* Ca 150 tag-objects */
	var tagCache = [ {"total": 147546, "unique_tags": "251879", "ratio": 0.585781267989789, "name": "Kristdemokraterna", "tag": "svpol"}, {"total": 12893, "unique_tags": "251879", "ratio": 0.0511872764303495, "name": "Kristdemokraterna", "tag": "migpol"}, {"total": 10256, "unique_tags": "251879", "ratio": 0.040717963784198, "name": "Kristdemokraterna", "tag": "Almedalen"}, {"total": 8861, "unique_tags": "251879", "ratio": 0.0351795902000564, "name": "Kristdemokraterna", "tag": "aftonbladet"}, {"total": 8753, "unique_tags": "251879", "ratio": 0.0347508128903164, "name": "Kristdemokraterna", "tag": "val2014"}, {"total": 8487, "unique_tags": "251879", "ratio": 0.0336947502570679, "name": "Kristdemokraterna", "tag": "dinr\u00f6st"}, {"total": 7211, "unique_tags": "251879", "ratio": 0.0286288257456954, "name": "Kristdemokraterna", "tag": "08pol"}, {"total": 6667, "unique_tags": "251879", "ratio": 0.0264690585558939, "name": "Kristdemokraterna", "tag": "twittboll"}, {"total": 6621, "unique_tags": "251879", "ratio": 0.0262864311832269, "name": "Kristdemokraterna", "tag": "almedalen"}, {"total": 5944, "unique_tags": "251879", "ratio": 0.0235986326768012, "name": "Kristdemokraterna", "tag": "twittpuck"}, {"total": 5851, "unique_tags": "251879", "ratio": 0.0232294077711917, "name": "Kristdemokraterna", "tag": "melfest"}, {"total": 5495, "unique_tags": "251879", "ratio": 0.0218160307131599, "name": "Kristdemokraterna", "tag": "pldebatt"}, {"total": 5405, "unique_tags": "251879", "ratio": 0.0214587162883766, "name": "Kristdemokraterna", "tag": "bopol"}, {"total": 5033, "unique_tags": "251879", "ratio": 0.0199818166659388, "name": "Kristdemokraterna", "tag": "NowPlaying"}, {"total": 4779, "unique_tags": "251879", "ratio": 0.0189733959559947, "name": "Kristdemokraterna", "tag": "Iran"}, {"total": 4752, "unique_tags": "251879", "ratio": 0.0188662016285597, "name": "Kristdemokraterna", "tag": "MTVStars"}, {"total": 4357, "unique_tags": "251879", "ratio": 0.0172979883197885, "name": "Kristdemokraterna", "tag": "DemandForAction"}, {"total": 4061, "unique_tags": "251879", "ratio": 0.0161228208782789, "name": "Kristdemokraterna", "tag": "funkpol"}, {"total": 3860, "unique_tags": "251879", "ratio": 0.0153248186629294, "name": "Kristdemokraterna", "tag": "svtdebatt"}, {"total": 3811, "unique_tags": "251879", "ratio": 0.0151302808094363, "name": "Kristdemokraterna", "tag": "skolan"}, {"total": 3549, "unique_tags": "251879", "ratio": 0.0140900988172893, "name": "Kristdemokraterna", "tag": "RunKeeper"}, {"total": 3512, "unique_tags": "251879", "ratio": 0.0139432028871006, "name": "Kristdemokraterna", "tag": "svt"}, {"total": 3511, "unique_tags": "251879", "ratio": 0.0139392327268252, "name": "Kristdemokraterna", "tag": "eupol"}, {"total": 3500, "unique_tags": "251879", "ratio": 0.0138955609637961, "name": "Kristdemokraterna", "tag": "s\u00e4kpol"}, {"total": 3459, "unique_tags": "251879", "ratio": 0.0137327843925059, "name": "Kristdemokraterna", "tag": "gameinsight"}, {"total": 3418, "unique_tags": "251879", "ratio": 0.0135700078212157, "name": "Kristdemokraterna", "tag": "Sweden"}, {"total": 3309, "unique_tags": "251879", "ratio": 0.0131372603512004, "name": "Kristdemokraterna", "tag": "svtagenda"}, {"total": 3302, "unique_tags": "251879", "ratio": 0.0131094692292728, "name": "Kristdemokraterna", "tag": "fb"}, {"total": 3243, "unique_tags": "251879", "ratio": 0.0128752297730259, "name": "Kristdemokraterna", "tag": "blipfoto"}, {"total": 3227, "unique_tags": "251879", "ratio": 0.01281170720862, "name": "Kristdemokraterna", "tag": "ipadgames"}, {"total": 3207, "unique_tags": "251879", "ratio": 0.0127323040031126, "name": "Kristdemokraterna", "tag": "quote"}, {"total": 2977, "unique_tags": "251879", "ratio": 0.0118191671397774, "name": "Kristdemokraterna", "tag": "nyttjobb"}, {"total": 2954, "unique_tags": "251879", "ratio": 0.0117278534534439, "name": "Kristdemokraterna", "tag": "gbgftw"}, {"total": 2786, "unique_tags": "251879", "ratio": 0.0110608665271817, "name": "Kristdemokraterna", "tag": "lundpol"}, {"total": 2764, "unique_tags": "251879", "ratio": 0.0109735230011236, "name": "Kristdemokraterna", "tag": "Syria"}, {"total": 2749, "unique_tags": "251879", "ratio": 0.010913970596993, "name": "Kristdemokraterna", "tag": "swgreen"}, {"total": 2662, "unique_tags": "251879", "ratio": 0.0105685666530358, "name": "Kristdemokraterna", "tag": "Expressen"}, {"total": 2607, "unique_tags": "251879", "ratio": 0.0103502078378904, "name": "Kristdemokraterna", "tag": "LLantbruk"}, {"total": 2465, "unique_tags": "251879", "ratio": 0.00978644507878783, "name": "Kristdemokraterna", "tag": "\u0627\u0644\u0645\u0634\u0647\u062f_\u0627\u0644\u0627\u062e\u064a\u0631"}, {"total": 2329, "unique_tags": "251879", "ratio": 0.00924650328133747, "name": "Kristdemokraterna", "tag": "ipad"}, {"total": 2293, "unique_tags": "251879", "ratio": 0.00910357751142414, "name": "Kristdemokraterna", "tag": "picoftheday"}, {"total": 2194, "unique_tags": "251879", "ratio": 0.00871053164416248, "name": "Kristdemokraterna", "tag": "Periscope"}, {"total": 2178, "unique_tags": "251879", "ratio": 0.00864700907975655, "name": "Kristdemokraterna", "tag": "Startup"}, {"total": 2139, "unique_tags": "251879", "ratio": 0.00849217282901711, "name": "Kristdemokraterna", "tag": "skola"}, {"total": 2126, "unique_tags": "251879", "ratio": 0.00844056074543729, "name": "Kristdemokraterna", "tag": "agenda"}, {"total": 2042, "unique_tags": "251879", "ratio": 0.00810706728230619, "name": "Kristdemokraterna", "tag": "investor"}, {"total": 2014, "unique_tags": "251879", "ratio": 0.00799590279459582, "name": "Kristdemokraterna", "tag": "USA"}, {"total": 1976, "unique_tags": "251879", "ratio": 0.00784503670413175, "name": "Kristdemokraterna", "tag": "BetancourtCollection2015"}, {"total": 1937, "unique_tags": "251879", "ratio": 0.0076902004533923, "name": "Kristdemokraterna", "tag": "aktuellt"}, {"total": 1932, "unique_tags": "251879", "ratio": 0.00767034965201545, "name": "Kristdemokraterna", "tag": "Apple"}, {"total": 1929, "unique_tags": "251879", "ratio": 0.00765843917118934, "name": "Kristdemokraterna", "tag": "dkpol"}, {"total": 1925, "unique_tags": "251879", "ratio": 0.00764255853008786, "name": "Kristdemokraterna", "tag": "love"}, {"total": 1917, "unique_tags": "251879", "ratio": 0.0076107972478849, "name": "Kristdemokraterna", "tag": "Spotify"}, {"total": 1910, "unique_tags": "251879", "ratio": 0.00758300612595731, "name": "Kristdemokraterna", "tag": "val14"}, {"total": 1862, "unique_tags": "251879", "ratio": 0.00739243843273953, "name": "Kristdemokraterna", "tag": "Vegas"}, {"total": 1828, "unique_tags": "251879", "ratio": 0.00725745298337694, "name": "Kristdemokraterna", "tag": "tv4val"}, {"total": 1817, "unique_tags": "251879", "ratio": 0.00721378122034787, "name": "Kristdemokraterna", "tag": "Stockholm"}, {"total": 1794, "unique_tags": "251879", "ratio": 0.00712246753401435, "name": "Kristdemokraterna", "tag": "svfm"}, {"total": 1763, "unique_tags": "251879", "ratio": 0.00699939256547787, "name": "Kristdemokraterna", "tag": "utbpol"}, {"total": 1763, "unique_tags": "251879", "ratio": 0.00699939256547787, "name": "Kristdemokraterna", "tag": "jobb"}, {"total": 1762, "unique_tags": "251879", "ratio": 0.0069954224052025, "name": "Kristdemokraterna", "tag": "mufswe"}, {"total": 1746, "unique_tags": "251879", "ratio": 0.00693189984079657, "name": "Kristdemokraterna", "tag": "fempol"}, {"total": 1743, "unique_tags": "251879", "ratio": 0.00691998935997046, "name": "Kristdemokraterna", "tag": "EU"}, {"total": 1732, "unique_tags": "251879", "ratio": 0.00687631759694139, "name": "Kristdemokraterna", "tag": "ifkgbg"}, {"total": 1686, "unique_tags": "251879", "ratio": 0.00669369022427435, "name": "Kristdemokraterna", "tag": "svmed"}, {"total": 1669, "unique_tags": "251879", "ratio": 0.00662619749959306, "name": "Kristdemokraterna", "tag": "bigdata"}, {"total": 1660, "unique_tags": "251879", "ratio": 0.00659046605711473, "name": "Kristdemokraterna", "tag": "apple"}, {"total": 1616, "unique_tags": "251879", "ratio": 0.00641577900499843, "name": "Kristdemokraterna", "tag": "alliansen"}, {"total": 1598, "unique_tags": "251879", "ratio": 0.00634431612004177, "name": "Kristdemokraterna", "tag": "lantbruk"}, {"total": 1576, "unique_tags": "251879", "ratio": 0.00625697259398362, "name": "Kristdemokraterna", "tag": "google"}, {"total": 1575, "unique_tags": "251879", "ratio": 0.00625300243370825, "name": "Kristdemokraterna", "tag": "sweden"}, {"total": 1519, "unique_tags": "251879", "ratio": 0.00603067345828751, "name": "Kristdemokraterna", "tag": "Nyheter"}, {"total": 1519, "unique_tags": "251879", "ratio": 0.00603067345828751, "name": "Kristdemokraterna", "tag": "escSE"}, {"total": 1499, "unique_tags": "251879", "ratio": 0.0059512702527801, "name": "Kristdemokraterna", "tag": "news"}, {"total": 1488, "unique_tags": "251879", "ratio": 0.00590759848975103, "name": "Kristdemokraterna", "tag": "iphone"}, {"total": 1471, "unique_tags": "251879", "ratio": 0.00584010576506974, "name": "Kristdemokraterna", "tag": "hollywood"}, {"total": 1452, "unique_tags": "251879", "ratio": 0.0057646727198377, "name": "Kristdemokraterna", "tag": "DN"}, {"total": 1400, "unique_tags": "251879", "ratio": 0.00555822438551844, "name": "Kristdemokraterna", "tag": "union"}, {"total": 1389, "unique_tags": "251879", "ratio": 0.00551455262248937, "name": "Kristdemokraterna", "tag": "Crowdfunding"}, {"total": 1388, "unique_tags": "251879", "ratio": 0.005510582462214, "name": "Kristdemokraterna", "tag": "fitt"}, {"total": 1379, "unique_tags": "251879", "ratio": 0.00547485101973567, "name": "Kristdemokraterna", "tag": "klimat"}, {"total": 1369, "unique_tags": "251879", "ratio": 0.00543514941698196, "name": "Kristdemokraterna", "tag": "oppnabron"}, {"total": 1365, "unique_tags": "251879", "ratio": 0.00541926877588048, "name": "Kristdemokraterna", "tag": "\u00f6resundsregionen"}, {"total": 1344, "unique_tags": "251879", "ratio": 0.00533589541009771, "name": "Kristdemokraterna", "tag": "fail"}, {"total": 1340, "unique_tags": "251879", "ratio": 0.00532001476899622, "name": "Kristdemokraterna", "tag": "SD"}, {"total": 1331, "unique_tags": "251879", "ratio": 0.00528428332651789, "name": "Kristdemokraterna", "tag": "nymo"}, {"total": 1316, "unique_tags": "251879", "ratio": 0.00522473092238734, "name": "Kristdemokraterna", "tag": "medium"}, {"total": 1296, "unique_tags": "251879", "ratio": 0.00514532771687993, "name": "Kristdemokraterna", "tag": "svkrim"}, {"total": 1295, "unique_tags": "251879", "ratio": 0.00514135755660456, "name": "Kristdemokraterna", "tag": "ISIS"}, {"total": 1279, "unique_tags": "251879", "ratio": 0.00507783499219863, "name": "Kristdemokraterna", "tag": "debatt"}, {"total": 1273, "unique_tags": "251879", "ratio": 0.00505401403054641, "name": "Kristdemokraterna", "tag": "domains"}, {"total": 1273, "unique_tags": "251879", "ratio": 0.00505401403054641, "name": "Kristdemokraterna", "tag": "Almedalen2015"}, {"total": 1269, "unique_tags": "251879", "ratio": 0.00503813338944493, "name": "Kristdemokraterna", "tag": "Svpol"}, {"total": 1251, "unique_tags": "251879", "ratio": 0.00496667050448827, "name": "Kristdemokraterna", "tag": "Paris"}, {"total": 1244, "unique_tags": "251879", "ratio": 0.00493887938256067, "name": "Kristdemokraterna", "tag": "jobbskaparna"}, {"total": 1242, "unique_tags": "251879", "ratio": 0.00493093906200993, "name": "Kristdemokraterna", "tag": "vardpol"}, {"total": 1242, "unique_tags": "251879", "ratio": 0.00493093906200993, "name": "Kristdemokraterna", "tag": "SoundCloud"}, {"total": 1229, "unique_tags": "251879", "ratio": 0.00487932697843012, "name": "Kristdemokraterna", "tag": "Israel"}, {"total": 1224, "unique_tags": "251879", "ratio": 0.00485947617705327, "name": "Kristdemokraterna", "tag": "mieexpert"}, {"total": 1218, "unique_tags": "251879", "ratio": 0.00483565521540105, "name": "Kristdemokraterna", "tag": "Bitcoin"}, {"total": 1209, "unique_tags": "251879", "ratio": 0.00479992377292271, "name": "Kristdemokraterna", "tag": "gbgpol"}, {"total": 1194, "unique_tags": "251879", "ratio": 0.00474037136879216, "name": "Kristdemokraterna", "tag": "piratpartiet"}, {"total": 1194, "unique_tags": "251879", "ratio": 0.00474037136879216, "name": "Kristdemokraterna", "tag": "Berlin"}, {"total": 1193, "unique_tags": "251879", "ratio": 0.00473640120851679, "name": "Kristdemokraterna", "tag": "svepol"}, {"total": 1187, "unique_tags": "251879", "ratio": 0.00471258024686457, "name": "Kristdemokraterna", "tag": "Ekot"}, {"total": 1186, "unique_tags": "251879", "ratio": 0.0047086100865892, "name": "Kristdemokraterna", "tag": "twittski"}, {"total": 1178, "unique_tags": "251879", "ratio": 0.00467684880438623, "name": "Kristdemokraterna", "tag": "f\u00f6pol"}, {"total": 1177, "unique_tags": "251879", "ratio": 0.00467287864411086, "name": "Kristdemokraterna", "tag": "No2Rouhani"}, {"total": 1174, "unique_tags": "251879", "ratio": 0.00466096816328475, "name": "Kristdemokraterna", "tag": "stockholm"}, {"total": 1170, "unique_tags": "251879", "ratio": 0.00464508752218327, "name": "Kristdemokraterna", "tag": "Breivik"}, {"total": 1136, "unique_tags": "251879", "ratio": 0.00451010207282068, "name": "Kristdemokraterna", "tag": "D\u00d6"}, {"total": 1126, "unique_tags": "251879", "ratio": 0.00447040047006698, "name": "Kristdemokraterna", "tag": "ampol"}, {"total": 1120, "unique_tags": "251879", "ratio": 0.00444657950841475, "name": "Kristdemokraterna", "tag": "GagaBestFans2016"}, {"total": 1107, "unique_tags": "251879", "ratio": 0.00439496742483494, "name": "Kristdemokraterna", "tag": "COP21"}, {"total": 1103, "unique_tags": "251879", "ratio": 0.00437908678373346, "name": "Kristdemokraterna", "tag": "skolchatt"}, {"total": 1090, "unique_tags": "251879", "ratio": 0.00432747470015365, "name": "Kristdemokraterna", "tag": "Sverige"}, {"total": 1089, "unique_tags": "251879", "ratio": 0.00432350453987827, "name": "Kristdemokraterna", "tag": "tv4"}, {"total": 1089, "unique_tags": "251879", "ratio": 0.00432350453987827, "name": "Kristdemokraterna", "tag": "VideoMTV2015"}, {"total": 1086, "unique_tags": "251879", "ratio": 0.00431159405905216, "name": "Kristdemokraterna", "tag": "jobbvalet"}, {"total": 1048, "unique_tags": "251879", "ratio": 0.00416072796858809, "name": "Kristdemokraterna", "tag": "h\u00e5llbarhet"}, {"total": 1024, "unique_tags": "251879", "ratio": 0.0040654441219792, "name": "Kristdemokraterna", "tag": "Instapray"}, {"total": 1013, "unique_tags": "251879", "ratio": 0.00402177235895013, "name": "Kristdemokraterna", "tag": "v\u00e4der"}, {"total": 1005, "unique_tags": "251879", "ratio": 0.00399001107674717, "name": "Kristdemokraterna", "tag": "eurovision"}, {"total": 1001, "unique_tags": "251879", "ratio": 0.00397413043564569, "name": "Kristdemokraterna", "tag": "zerotroll"}, {"total": 1000, "unique_tags": "251879", "ratio": 0.00397016027537032, "name": "Kristdemokraterna", "tag": "Almedalen2014"}, {"total": 991, "unique_tags": "251879", "ratio": 0.00393442883289198, "name": "Kristdemokraterna", "tag": "nowPlaying"}, {"total": 987, "unique_tags": "251879", "ratio": 0.0039185481917905, "name": "Kristdemokraterna", "tag": "grindr"}, {"total": 984, "unique_tags": "251879", "ratio": 0.00390663771096439, "name": "Kristdemokraterna", "tag": "TTIP"}, {"total": 983, "unique_tags": "251879", "ratio": 0.00390266755068902, "name": "Kristdemokraterna", "tag": "ojnare"}, {"total": 983, "unique_tags": "251879", "ratio": 0.00390266755068902, "name": "Kristdemokraterna", "tag": "Aftonbladet"}, {"total": 982, "unique_tags": "251879", "ratio": 0.00389869739041365, "name": "Kristdemokraterna", "tag": "sverige"}, {"total": 963, "unique_tags": "251879", "ratio": 0.00382326434518161, "name": "Kristdemokraterna", "tag": "Sadad"}, {"total": 963, "unique_tags": "251879", "ratio": 0.00382326434518161, "name": "Kristdemokraterna", "tag": "orepol"}, {"total": 962, "unique_tags": "251879", "ratio": 0.00381929418490624, "name": "Kristdemokraterna", "tag": "photooftheday"}, {"total": 953, "unique_tags": "251879", "ratio": 0.00378356274242791, "name": "Kristdemokraterna", "tag": "dinroest"}, {"total": 932, "unique_tags": "251879", "ratio": 0.00370018937664514, "name": "Kristdemokraterna", "tag": "mel2012"}, {"total": 922, "unique_tags": "251879", "ratio": 0.00366048777389143, "name": "Kristdemokraterna", "tag": "DNSthlm"}, {"total": 921, "unique_tags": "251879", "ratio": 0.00365651761361606, "name": "Kristdemokraterna", "tag": "avtal16"}, {"total": 915, "unique_tags": "251879", "ratio": 0.00363269665196384, "name": "Kristdemokraterna", "tag": "sfprkp"}, {"total": 910, "unique_tags": "251879", "ratio": 0.00361284585058699, "name": "Kristdemokraterna", "tag": "sommar"}, {"total": 897, "unique_tags": "251879", "ratio": 0.00356123376700717, "name": "Kristdemokraterna", "tag": "pkdebatt"}, {"total": 894, "unique_tags": "251879", "ratio": 0.00354932328618106, "name": "Kristdemokraterna", "tag": "London"}, {"total": 887, "unique_tags": "251879", "ratio": 0.00352153216425347, "name": "Kristdemokraterna", "tag": "Wireless"}, {"total": 886, "unique_tags": "251879", "ratio": 0.0035175620039781, "name": "Kristdemokraterna", "tag": "Iraq"}, {"total": 882, "unique_tags": "251879", "ratio": 0.00350168136287662, "name": "Kristdemokraterna", "tag": "Genocide"}, {"total": 879, "unique_tags": "251879", "ratio": 0.00348977088205051, "name": "Kristdemokraterna", "tag": "semester"}, {"total": 867, "unique_tags": "251879", "ratio": 0.00344212895874606, "name": "Kristdemokraterna", "tag": "betting"}, {"total": 861, "unique_tags": "251879", "ratio": 0.00341830799709384, "name": "Kristdemokraterna", "tag": "nufc"}, {"total": 860, "unique_tags": "251879", "ratio": 0.00341433783681847, "name": "Kristdemokraterna", "tag": "equalnordic"}, {"total": 858, "unique_tags": "251879", "ratio": 0.00340639751626773, "name": "Kristdemokraterna", "tag": "eoschile"}, {"total": 854, "unique_tags": "251879", "ratio": 0.00339051687516625, "name": "Kristdemokraterna", "tag": "Uppsala"}, {"total": 851, "unique_tags": "251879", "ratio": 0.00337860639434014, "name": "Kristdemokraterna", "tag": "HV71"} ];

	/*
	Randomized test data.
	OUTPUT: parties = <array> containing party objects.
	I.e a party object haw the following structure:
		days 		= <array>
		endDate 	= <timestamp>
		hashtags 	= <array>
		limit		= <integer>
		maxDate		= <timestamp>
		minDate		= <timestamp>
		name 		= <string> Party name
		startDate 	= <timestamp>
	*/
	this.generateTestData = function () {
		var partyPropeties = ptcSettings.getPartyProperties();
		var parties = [];

		for (var key in partyPropeties) {
			var partyObject = {};
			partyObject.name = partyPropeties[key].name;
			partyObject.limit = 100;
			partyObject.startDate = new Date(2006, 1, 1, 1);
			partyObject.endDate = new Date(2016, 1, 1, 1);
			partyObject.minDate = new Date(2006, 1, 1, 1);
			partyObject.maxDate = new Date(2016, 1, 1, 1);
			partyObject.hashtags = this.generateHashtags();
			parties.push(partyObject);
			//uniqueTags...
			partyObject.days = this.generateDays(partyObject.startDate, partyObject.endDate)
			//requestedInterval...		
		};
		// console.log(parties)
		return parties;
	}


	/* Parses the hashtags from tagCache.
	OUTPUT: 	hashtags = <array> with objects {text: "hashtag"} 
	*/
	this.generateHashtags = function () {
		var hashtags = [];
		for (var i = 0; i < tagCache.length; i++) {
			var tagObject = {};
			tagObject.text = tagCache[i].tag;
			hashtags.push(tagObject);
		};
		return hashtags;		
	}

	/* Calculates number of days between two dates.
	INPUT: 	firstDate 	= <timestamp>
			secondDate 	= <timestamp>
	Output: diffDays 	= <integer> describing the number of days between two date.
	I.e firstDate = 2000-1-1 and secondDate = 2000-1-2 then diffDays = 1.
	*/
	this.getNumberOfDays = function (firstDate, secondDate) {	
		var oneDay = 24*60*60*1000;	// hours*minutes*seconds*milliseconds
		var diffDays = Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay));
		return diffDays;
	}


	/* Generates an array containing arrays for each day. The weight of the first element corresponds to the first
	hashtag in hashtags.
	INPUT: 	limit 		= <integer> 	sets number of hashtags per day.
			startDate 	= <timestamp> 	first day.
			endDate		= <timestamp> 	last day.
	OUTPUT: days 		= <array>		All days in the intervall.

	*/
	this.generateDays = function (startDate, endDate) {
		numberOfDays = this.getNumberOfDays(startDate, endDate);
		// console.log(numberOfDays);
		var days = [];
		var max = 10;
		var min = 1;
		for (var j = 0; j < numberOfDays; j++) {
			var day = [];
			for (var i = 0; i < tagCache.length; i++) {
				var weight = Math.floor(Math.random() * max) + min;
				day.push(weight);
			};
			days.push(day);
		};
		return days
	}
	

	this.generateTestData();
	//Endast för testning. Hämtat från internet. returnerar approximerade storleken av ett object.
	function memorySizeOf(obj) {
	    var bytes = 0;

	    function sizeOf(obj) {
	        if(obj !== null && obj !== undefined) {
	            switch(typeof obj) {
	            case 'number':
	                bytes += 8;
	                break;
	            case 'string':
	                bytes += obj.length * 2;
	                break;
	            case 'boolean':
	                bytes += 4;
	                break;
	            case 'object':
	                var objClass = Object.prototype.toString.call(obj).slice(8, -1);
	                if(objClass === 'Object' || objClass === 'Array') {
	                    for(var key in obj) {
	                        if(!obj.hasOwnProperty(key)) continue;
	                        sizeOf(obj[key]);
	                    }
	                } else bytes += obj.toString().length * 2;
	                break;
	            }
	        }
	        return bytes;
	    };

	    function formatByteSize(bytes) {
	        if(bytes < 1024) return bytes + " bytes";
	        else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + " KiB";
	        else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + " MiB";
	        else return(bytes / 1073741824).toFixed(3) + " GiB";
	    };

	    return formatByteSize(sizeOf(obj));
	};

	return this;
});