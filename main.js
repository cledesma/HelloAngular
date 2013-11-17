
//-- Start Framework Code

function HttpUtil() {

	this.httpGet = function(url, callback){

		console.log("-- httpGet() --");
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", url, true);
		xmlHttp.onreadystatechange = function(){
			var httpUtil = new HttpUtil();
			httpUtil.processResponse(xmlHttp, callback);
		}
		xmlHttp.send(null);
	};

	this.processResponse = function(xmlHttp, callback){

		console.log("-- processResponse() --");
		if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
			var response = xmlHttp.responseText;
			console.log("Success. Response Text: " + response);
			var httpUtil = new HttpUtil();
			var jsonResponse = httpUtil.getJson(response);
			callback(jsonResponse);
		} else {
			console.log("HTTP Status: " + xmlHttp.status + " Ready state: " + xmlHttp.readyState + " Response Text: " + xmlHttp.responseText);
		}
	};

	this.getJson = function(response){
		
		console.log("-- getJson() --");
		var jsonResponse = null;
		if (response != null){
			jsonResponse = eval('(' + response + ')');
		} else {
			console.log("Response is null");
		}
		return jsonResponse;
	};

}

//----- End Framework Code

function HttpController($scope){

	function callback(json){
		console.log("-- callback() --");
		var name = json[0].firstName;
		console.log("Name: " + name);
		$scope.$apply(function(){
			$scope.data = {name: name};
		});
	}

	$scope.doButtonClick = function(){
		console.log("-- doButtonClick() --");
		var httpUtil = new HttpUtil();
		httpUtil.httpGet("http://localhost:8081/base-jersey-project/user",callback);
	}                 
}

function FirstController($scope){
	$scope.data = {message: "Hello FirstController"};
}

function SecondController($scope){
	$scope.data = {message: "Hello SecondController"};
}
