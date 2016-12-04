var app = angular.module('ibct-web',['ngRoute']);

app.config(function($routeProvider,$locationProvider){
	$routeProvider
	.when("/", {
		 templateUrl: "welcome.html"
	})
	.when("/AddBulletin", {
		templateUrl: "add.html",
		controller: "addController"
	})
	.when("/Redirect",{ 
		templateUrl: "redirection.html",
		controller: "redirectionController"
			})
	.when("/Login",{ 
		templateUrl: "login.html",
		controller: "loginController"
			})
	.when("/Home",{ 
		templateUrl: "Index.html",
		controller: "mainController"
			})
	;
});


app.controller('addController', function($scope,$http){
	$scope.productLines = [{"productLine":"LM1500","productLineDesc":"LM1500","createdBy":"cct","createdDate":1047476599000,"lastUpdatedBy":"cct","lastUpdatedDate":1047476599000},{"productLine":"LM1600","productLineDesc":"LM1600","createdBy":"cct","createdDate":1047476599000,"lastUpdatedBy":"cct","lastUpdatedDate":1047476599000},{"productLine":"LM2500","productLineDesc":"LM2500","createdBy":"cct","createdDate":1047476599000,"lastUpdatedBy":"cct","lastUpdatedDate":1047476599000},{"productLine":"LM500","productLineDesc":"LM500","createdBy":"cct","createdDate":1047476599000,"lastUpdatedBy":"cct","lastUpdatedDate":1047476599000},{"productLine":"LM5000","productLineDesc":"LM5000","createdBy":"cct","createdDate":1047476599000,"lastUpdatedBy":"cct","lastUpdatedDate":1047476599000},{"productLine":"LM6000","productLineDesc":"LM6000","createdBy":"cct","createdDate":1047476599000,"lastUpdatedBy":"cct","lastUpdatedDate":1047476599000},{"productLine":"LMS100","productLineDesc":"LMS100","createdBy":"tji018t","createdDate":1074053005000,"lastUpdatedBy":"tji018t","lastUpdatedDate":1074053005000},{"productLine":"LM2000","productLineDesc":"LM2000","createdBy":"ngbe8xt","createdDate":1117610755000,"lastUpdatedBy":"ngbe8xt","lastUpdatedDate":1117610755000}];
	$scope.myname = "jai";
	$http.get('http://localhost:8191/ibct/Product').then(function(response) {
        console.log(response.data);
    });
	
});

