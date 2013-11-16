
//-- Start Framework Code

function httpGet(url, callback){

	console.log("-- httpGet() --");
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url, true);
	xmlHttp.onreadystatechange = function(){
		processResponse(xmlHttp, callback);
	}
	xmlHttp.send(null);
}

function processResponse(xmlHttp, callback){

	console.log("-- processResponse() --");
	if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
		var response = xmlHttp.responseText;
		console.log("Success. Response Text: " + response);
		var jsonResponse = getJson(response);
		callback(jsonResponse);
	} else {
		console.log("HTTP Status: " + xmlHttp.status + " Ready state: " + xmlHttp.readyState + " Response Text: " + xmlHttp.responseText);
	}
}

function getJson(response){
	
	console.log("-- getJson() --");
	var jsonResponse = null;
	if (response != null){
		jsonResponse = eval('(' + response + ')');
	} else {
		console.log("Response is null");
	}
	return jsonResponse;
}

//----- End Framework Code

function HttpController($scope){

	$scope.data = null;

	function callback(json){
		console.log("-- callback() --");
		var name = json[0].firstName;
		console.log("Name: " + name);
		$scope.data = {name: name};
	}

	$scope.doButtonClick = function(){
		console.log("-- doButtonClick() --");
		httpGet("http://localhost:8081/base-jersey-project/user",callback);
	}
}

function FirstController($scope){
	$scope.data = {message: "Hello FirstController"};
}

function SecondController($scope){
	$scope.data = {message: "Hello SecondController"};
}
