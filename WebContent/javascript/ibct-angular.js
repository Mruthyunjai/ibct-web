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
	.when("/UpdateBulletin",{ 
		templateUrl: "update.html",
		controller: "updateController"
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
	
	$http.get('http://localhost:8090/ibct/Bulletin/BulletinTypes').then(function(response) {
        console.log(response.data.data);
        $scope.bulletinTypes = response.data.data;
    });
	//$scope.bulletinTypes=[{"bulletinType":"Product Bulletin"},{"bulletinType":"Service Bulletin"},{"bulletinType":"System Bulletin"}];

	$scope.category=[{"Category":"A-ALERT"},{"Category":"C-CAMPAIGN"},{"Category":"O-OPTIONAL"},{"Category":"R-ROUTINE"},{"Category":"SPS-SPS CONVERSION"}];
	
	$scope.complianceLevel=[{"compLevel":"D-DEPOT"},{"compLevel":"F-FIELD"},{"compLevel":"F/D-FIELD REPORT"},{"compLevel":"SPS-SPS CONVERSION"}];
	$scope.timing=[{"Timing":"0 - NONE"},{"Timing":"1 - PRIOR TO START-UP/ENGINE OPERATION"},{"Timing":"2 - AT FIRST OPPORTUNITY (NEXT PI OR SHUTDOWN AT LATEST)"},{"Timing":"3 - AT FIRST OPPORTUNITY PRIOR TO TSN/CSN LIMIT"},{"Timing":"4 - AT FIRST EXPOSURE OF EMU/MODULE"},{"Timing":"5 - AT COMPONENT PART EXPOSURE"},{"Timing":"6 - AT COMPONENT PART REPAIR OR REPLACEMENT"},{"Timing":"7 - OPTIONAL"},{"Timing":"8 - AT NEXT DEPOT VISIT"},{"Timing":"9 - NOT PLANNED BY CUSTOMER"}];
	$scope.fromSerialNo=[{"fSerNo":"05837"},{"fSerNo":"05838"},{"fSerNo":"05839"},{"fSerNo":"05840"},{"fSerNo":"05841"},{"fSerNo":"05842"},{"fSerNo":"05843"}];
	$scope.toSerialNo=[{"tSerNo":"05837"},{"tSerNo":"05838"},{"tSerNo":"05839"},{"tSerNo":"05840"},{"tSerNo":"05841"},{"tSerNo":"05842"},{"tSerNo":"05843"}];
	$scope.formLink=true;
	$scope.enableForm=function(){
		$scope.formLink=false;
	}
	$scope.buttonLink=true;
    $scope.enableButton=function(){
           console.log((this.addController.productLines&&this.addController.bulletinTypes))
           if(!(this.addController.productLines&&this.addController.bulletinTypes))
                  {
                  $scope.buttonLink=true;
                  $scope.formLink=true;
                  }
           else
                  $scope.buttonLink=false;
    }
});


app.controller('updateController', function($scope,$http){
	
});
