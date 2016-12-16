var app = angular.module('ibct-web', [ 'ngRoute' ]);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider.when("/", {
		templateUrl : "welcome.html"
	}).when("/AddBulletin", {
		templateUrl : "add.html",
		controller : "addController"
	}).when("/UpdateBulletin", {
		templateUrl : "update.html",
		controller : "updateController"
	}).when("/Login", {
		templateUrl : "login.html",
		controller : "loginController"
	}).when("/Home", {
		templateUrl : "Index.html",
		controller : "mainController"
	}).when("/Cancel", {
		templateUrl : "cancel.html",
		controller : "cancelController"
	});
});

app
		.controller(
				'addController',
				function($scope, $http) {
					$scope.productLines = [ {
						"productLine" : "LM1500",
						"productLineDesc" : "LM1500",
						"createdBy" : "cct",
						"createdDate" : 1047476599000,
						"lastUpdatedBy" : "cct",
						"lastUpdatedDate" : 1047476599000
					}, {
						"productLine" : "LM1600",
						"productLineDesc" : "LM1600",
						"createdBy" : "cct",
						"createdDate" : 1047476599000,
						"lastUpdatedBy" : "cct",
						"lastUpdatedDate" : 1047476599000
					}, {
						"productLine" : "LM2500",
						"productLineDesc" : "LM2500",
						"createdBy" : "cct",
						"createdDate" : 1047476599000,
						"lastUpdatedBy" : "cct",
						"lastUpdatedDate" : 1047476599000
					}, {
						"productLine" : "LM500",
						"productLineDesc" : "LM500",
						"createdBy" : "cct",
						"createdDate" : 1047476599000,
						"lastUpdatedBy" : "cct",
						"lastUpdatedDate" : 1047476599000
					}, {
						"productLine" : "LM5000",
						"productLineDesc" : "LM5000",
						"createdBy" : "cct",
						"createdDate" : 1047476599000,
						"lastUpdatedBy" : "cct",
						"lastUpdatedDate" : 1047476599000
					}, {
						"productLine" : "LM6000",
						"productLineDesc" : "LM6000",
						"createdBy" : "cct",
						"createdDate" : 1047476599000,
						"lastUpdatedBy" : "cct",
						"lastUpdatedDate" : 1047476599000
					}, {
						"productLine" : "LMS100",
						"productLineDesc" : "LMS100",
						"createdBy" : "tji018t",
						"createdDate" : 1074053005000,
						"lastUpdatedBy" : "tji018t",
						"lastUpdatedDate" : 1074053005000
					}, {
						"productLine" : "LM2000",
						"productLineDesc" : "LM2000",
						"createdBy" : "ngbe8xt",
						"createdDate" : 1117610755000,
						"lastUpdatedBy" : "ngbe8xt",
						"lastUpdatedDate" : 1117610755000
					} ];

					$scope.myname = "jai";

					$http
							.get(
									'http://localhost:8090/ibct/Bulletin/BulletinTypes')
							.then(function(response) {
								console.log(response.data.data);
								$scope.bulletinTypes = response.data.data;
							});
					// $scope.bulletinTypes=[{"bulletinType":"Product
					// Bulletin"},{"bulletinType":"Service
					// Bulletin"},{"bulletinType":"System Bulletin"}];

					$scope.category = [ {
						"Category" : "A-ALERT"
					}, {
						"Category" : "C-CAMPAIGN"
					}, {
						"Category" : "O-OPTIONAL"
					}, {
						"Category" : "R-ROUTINE"
					}, {
						"Category" : "SPS-SPS CONVERSION"
					} ];

					$scope.complianceLevel = [ {
						"compLevel" : "D-DEPOT"
					}, {
						"compLevel" : "F-FIELD"
					}, {
						"compLevel" : "F/D-FIELD REPORT"
					}, {
						"compLevel" : "SPS-SPS CONVERSION"
					} ];

					$http
					.get(
							'http://localhost:8090/ibct/Bulletin/CodesOptions/TIMING_CODE')
					.then(function(response) {

						$scope.timing = response.data.data;
						//console.log($scope.timing);
					});
					function getBulletinTypeCode(bulletintype) {
						if (bulletintype == "PRODUCT BULLETIN") {
							return 20000043;
						} else if (bulletintype == "SERVICE BULLETIN") {
							return 20000042;
						} else if (bulletintype == "SYSTEM BULLETIN") {
							return 2726;
						} else {
							return 0;
						}
					}
					$scope.enableForm = function() {
						$scope.formLink = false;
						$scope.serialuri = 'http://localhost:8090/ibct/Bulletin/Serials/'
								+ this.addController.productLines.productLine
								+ '/';

						if (this.addController.bulletinTypes == "PRODUCT BULLETIN") {
							$scope.serialuri = $scope.serialuri + '20000043';
							$scope.typecode = 20000043
						} else if (this.addController.bulletinTypes == "SERVICE BULLETIN") {
							$scope.serialuri = $scope.serialuri + '20000042';
							$scope.typecode = 20000042
						} else if (this.addController.bulletinTypes == "SYSTEM BULLETIN") {
							$scope.serialuri = $scope.serialuri + '2726';
							$scope.typecode = 2726
						} else {
							return 0;
						}

						$scope.superceedUri = $scope.superceedUri
								+ this.addController.productLines.productLine;
						console.log($scope.serialuri);
						$http.get($scope.serialuri).then(function(response) {
							console.log(response.data);
							$scope.fromSN = response.data.data;
							$scope.toSN = response.data.data;
						});
						$scope.supercedes = [];
						$scope.superdata = {
							"productLine" : this.addController.productLines.productLine,
							"bulletinTypeCode" : $scope.typecode,
							"bulletinStatus" : 'EFFECTIVE'
						};
						console.log($scope.superdata);
						$http(
								{
									method : 'POST',
									url : 'http://localhost:8090/ibct/Bulletin/Superced',
									dataType : 'json',
									data : JSON.stringify($scope.superdata),
									headers : {
										'Content-Type' : 'application/json'
									}
								}).success(
								function(data, status, headers, config) {
									$scope.supercedes = data.data;
									console.log(data);
								}).error(
								function(data, status, headers, config) {
									console.log(status);
								});
						this.addController.supercedes = $scope.supercedes;

					}
					$scope.serialNumber = [];

					$scope.addSN = function(fromSN, toSN) {
						if ((fromSN.length == 1) && toSN) {
							if (fromSN >= toSN) {
								alert("To Serial Number should be greater than from Serial Number")
							} else {
								$scope.serialNumber.push({
									fromSNum : fromSN[0],
									toSNum : toSN
								});
							}
						}

						else if (fromSN.length > 1) {

							for (i = 0; i < fromSN.length; i++) {
								$scope.serialNumber.push({
									fromSNum : fromSN[i],
									toSNum : ""
								});
							}
						}
						console.log($scope.serialNumber);
					}

					$scope.buttonLink = true;
					$scope.enableButton = function() {
						console
								.log((this.addController.productLines && this.addController.bulletinTypes))
						if (!(this.addController.productLines && this.addController.bulletinTypes)) {
							$scope.buttonLink = true;
							$scope.formLink = true;

						} else
							$scope.buttonLink = false;
					}

					$scope.clearFormControlFields = function() {
						var elements = document.getElementsByTagName("input");
						var dropdowns = document.getElementsByTagName("select");
						var textboxes = document
								.getElementsByTagName("textarea");
						var i = 0
						for (i = 0; i < elements.length; i++) {
							if (elements[i].type == "text") {
								elements[i].value = "";
							}
							if (elements[i].type == "checkbox") {
								elements[i].checked = elements[i].defaultChecked;
							}
							if (elements[i].type == "date") {
								elements[i].value = "";
							}

						}
						for (i = 0; i < dropdowns.length; i++) {
							if (dropdowns[i].type == "select-one") {
								dropdowns[i].value = "";
							}
							if (dropdowns[i].type == "select-multiple") {
								dropdowns[i].value = [];
							}

						}
						for (i = 0; i < textboxes.length; i++) {
							if (textboxes[i].type == "textarea") {
								textboxes[i].value = "";
							}
						}

					}

					$scope.save = function() {
						$http(
								{
									method : 'POST',
									url : 'http://localhost:8090/ibct/Bulletin/CancelBulletin',
									dataType : 'json',
									data : JSON.stringify({
										"bulletinNum" : "LM6000-IND-163"
									}),
									headers : {
										'Content-Type' : 'application/json'
									}
								}).success(
								function(data, status, headers, config) {
									// this callback will be called
									// asynchronously
									// when the response is available
									console.log(data);
								}).error(
								function(data, status, headers, config) {
									// called asynchronously if an error occurs
									// or server returns response with an error
									// status.
									console.log(status);
								});

					}
					$scope.bulletinValues = [];
					function getFields(input, field) {
						return input.map(function(o) {
							return o[field];
						});
					}
					$scope.saveFormControlFields = function() {
						if (this.addController.bulletin == "") {
							return false;
						}
						if (this.addController.revision == "") {
							return false;
						}
						if (this.addController.revision == "") {
							return false;
						}
						/*
						 * console.log(JSON.stringify(this.addController.category)+".."+
						 * JSON.stringify(this.addController.timing));
						 */
						$scope.bulletinValues.Bulletin = this.addController.bulletin;
						$scope.bulletinValues.BulletinTypeCode = getBulletinTypeCode(this.addController.bulletinTypes);// this.addController.bulletinTypes;
						$scope.bulletinValues.Revision = this.addController.revision;
						$scope.bulletinValues.Description = this.addController.description;
						$scope.bulletinValues.Supercedes = this.addController.supercedes;
						$scope.bulletinValues.Category = this.addController.category.Category;
						$scope.bulletinValues.ComplianceLevel = this.addController.complianceLevel.compLevel;
						$scope.bulletinValues.Timing = getFields(
								this.addController.timing, 'codeID');
						$scope.bulletinValues.RevDate = this.addController.revDate
								.getDate();
						if (this.addController.trackImplementationPlan) {
							$scope.bulletinValues.TrackImplementationPlan = this.addController.trackImplementationPlan;
						} else {
							$scope.bulletinValues.TrackImplementationPlan = false;
						}
						if (this.addController.significant) {
							$scope.bulletinValues.Significant = this.addController.significant;
						} else {
							$scope.bulletinValues.Significant = false;
						}
						$scope.bulletinValues.IssueDate = this.addController.issueDate
								.getDate();
						if (this.addController.voucherProgram) {
							$scope.bulletinValues.VoucherProgram = this.addController.voucherProgram;
						} else {
							$scope.bulletinValues.VoucherProgram = false;
						}
						if (this.addController.fieldImplementationMetric) {
							$scope.bulletinValues.fieldImplementationMetric = this.addController.fieldImplementationMetric;
						} else {
							$scope.bulletinValues.fieldImplementationMetric = false;
						}
						$scope.bulletinValues.serialNumbers = $scope.serialNumber;
						$scope.bulletinValues.Remarks = this.addController.remarks;
						$scope.bulletinValues.ProductLine = this.addController.productLines.productLine;
						$scope.bulletinValues.fromSerials = getFields(
								$scope.bulletinValues.serialNumbers, 'fromSNum');
						$scope.bulletinValues.toSerials = getFields(
								$scope.bulletinValues.serialNumbers, 'toSNum');
						console.log($scope.bulletinValues);
						console.log($scope.bulletinValues.fromSerials);
						console.log($scope.bulletinValues.toSerials);
						$http(
								{
									method : 'POST',
									url : 'http://localhost:8090/ibct/Bulletin/Insert',
									dataType : 'json',
									data : JSON
											.stringify({
												"category" : $scope.bulletinValues.Category,
												"bulletinNum" : $scope.bulletinValues.Bulletin,
												"complianceLevel" : $scope.bulletinValues.ComplianceLevel,
												"trackImplimentationPlan" : $scope.bulletinValues.TrackImplementationPlan,
												"significant" : $scope.bulletinValues.Significant,
												"voucherProgram" : $scope.bulletinValues.VoucherProgram,
												"remarks" : $scope.bulletinValues.Remarks,
												"bulletinTypeCode" : getBulletinTypeCode(this.addController.bulletinTypes),
												"latestRevId" : $scope.bulletinValues.Revision,
												"createdBy" : "502353971",
												"productLine" : $scope.bulletinValues.ProductLine,
												"description" : $scope.bulletinValues.Description,
												"revision" : $scope.bulletinValues.Revision,
												"createdBy" : "jai",
												"timings" : $scope.bulletinValues.Timing,
												"fromserials" : $scope.bulletinValues.fromSerials,
												"toserials" : $scope.bulletinValues.toSerials,
												"fieldImplementationMetric" : $scope.bulletinValues.fieldImplementationMetric,
												"issueDate" : $scope.bulletinValues.IssueDate,
												"revisionDate" : $scope.bulletinValues.RevDate
											}),
									headers : {
										'Content-Type' : 'application/json'
									}
								}).success(
								function(data, status, headers, config) {
									// this callback will be called
									// asynchronously
									// when the response is available
									console.log(data);
									alert('Bulletin successfully added.!');
								}).error(
								function(data, status, headers, config) {
									// called asynchronously if an error occurs
									// or server returns response with an error
									// status.
									console.log(data);
									alert('There was an error adding new bulletin please try again later.');
								});
					}

				});

/*******************************************************************************
 * UPDATE CONTROLLER
 ******************************************************************************/

app
.controller(
		'updateController',
		function($scope, $http) {

			// $scope.productLine = [];

			$http.get('http://localhost:8090/ibct/Product').then(
					function(response) {

						$scope.productLines = response.data.data;
					});
			/*$http
					.get('http://localhost:8090/ibct/Bulletin/BulletinTypes')
					.then(function(response) {
						console.log(response.data.data);
						$scope.bulletinTypes = response.data.data;
					});*/
			$http
			.get(
					'http://localhost:8090/ibct/Bulletin/CodesOptions/TIMING_CODE')
			.then(function(response) {

				$scope.timing = response.data.data;
				//console.log($scope.timing);
			});
			$http
			.get(
					'http://localhost:8090/ibct/Bulletin/CodesOptions/BULLETIN_CATEGORY')
			.then(function(response) {

				$scope.bulletinCategory = response.data.data;
				//console.log($scope.bulletinCategory);
			});
			$http
			.get('http://localhost:8090/ibct/Bulletin/CodesOptions/BULLETIN_TYPE')
			.then(function(response) {

				$scope.bulletinTypes = response.data.data;
				
			});
			
			$scope.complianceLevel = [ {
				"compLevel" : "D-DEPOT"
			}, {
				"compLevel" : "F-FIELD"
			}, {
				"compLevel" : "F/D-FIELD REPORT"
			}, {
				"compLevel" : "SPS-SPS CONVERSION"
			} ];
			
			
			$scope.changeBulletinRevisions = function(bulletinnumber) {
				console.log(bulletinnumber);
				$scope.serialuri = 'http://localhost:8090/ibct/Bulletin/Serials/'
					+ this.updateController.productLines.productLine
					+ '/';
				$scope.serialuri = $scope.serialuri + this.updateController.bulletinTypes.codeID
			
				
			
			$http.get($scope.serialuri).then(function(response) {
				console.log(response.data);
				$scope.fromSN = response.data.data;
				$scope.toSN = response.data.data;
				
				if (bulletinnumber) {
					
					$http(
							{
								method : 'POST',
								url : 'http://localhost:8090/ibct/Bulletin/Revisions',
								dataType : 'json',
								data : JSON.stringify({
									"bulletinNum" : bulletinnumber
								}),
								headers : {
									'Content-Type' : 'application/json'
								}
							}).success(
							function(data, status, headers, config) {
								console.log(data);
								$scope.revisions = data.data;

							}).error(
							function(data, status, headers, config) {
								console.log(data);
							});
				}
			});
			}
			$scope.fillBulletins = function() {
				console.log(this.updateController.bulletinTypes);
				console
						.log(this.updateController.productLines.productLine);
				if (this.updateController.bulletinTypes
						&& this.updateController.productLines.productLine) {
					$http(
							{
								method : 'POST',
								url : 'http://localhost:8090/ibct/Bulletin/Bulletins',
								dataType : 'json',
								data : JSON
										.stringify({
											"bulletinTypeCode" : this.updateController.bulletinTypes.codeID,
											"productLine" : this.updateController.productLines.productLine
										}),
								headers : {
									'Content-Type' : 'application/json'
								}
							}).success(
							function(data, status, headers, config) {
								$scope.bulletinNumbers = data.data;
								$scope.bulletins = data.data;
							}).error(
							function(data, status, headers, config) {
								alert('An error occured. Please raise a request in Serice-Now. You can find the link at the top right corner of the page.');
								console.log(status);
							});

				}
			}
			$scope.updateBulletin = function(status) {
				$scope.bulletinValues = [];
				console.log(status);
				if (status == 'EFFECTIVE') {
					console.log(this.updateController.bulletinNumbers);
					
					$scope.bulletinValues.Bulletin = this.updateController.bulletinNumbers.bulletinNum;
					$scope.bulletinValues.BulletinTypeCode = this.updateController.bulletinNumbers.bulletinTypeCode;// this.addController.bulletinTypes;
					$scope.bulletinValues.Revision = this.updateController.revision;
					$scope.bulletinValues.Description = this.updateController.description;
					$scope.bulletinValues.Category = this.updateController.bulletinCategory;
					$scope.bulletinValues.ComplianceLevel = this.updateController.complianceLevel.compLevel;
					
					$scope.bulletinValues.RevDate = this.updateController.revDate
							.getDate();
					if (this.updateController.trackImplementationPlan) {
						$scope.bulletinValues.TrackImplementationPlan = this.updateController.trackImplementationPlan;
					} else {
						$scope.bulletinValues.TrackImplementationPlan = false;
					}
					if (this.updateController.significant) {
						$scope.bulletinValues.Significant = this.updateController.significant;
					} else {
						$scope.bulletinValues.Significant = false;
					}
					
					if (this.updateController.voucherProgram) {
						$scope.bulletinValues.VoucherProgram = this.updateController.voucherProgram;
					} else {
						$scope.bulletinValues.VoucherProgram = false;
					}
					if (this.updateController.fieldImplementationMetric) {
						$scope.bulletinValues.fieldImplementationMetric = this.updateController.fieldImplementationMetric;
					} else {
						$scope.bulletinValues.fieldImplementationMetric = false;
					}
					$scope.bulletinValues.serialNumbers = $scope.serialNumber;
					$scope.bulletinValues.Remarks = this.updateController.remarks;
					$scope.bulletinValues.ProductLine = this.updateController.productLines.productLine;
					$scope.bulletinValues.fromSerials = getFields(
							$scope.bulletinValues.serialNumbers, 'fromSNum');
					$scope.bulletinValues.toSerials = getFields(
							$scope.bulletinValues.serialNumbers, 'toSNum');
					console.log($scope.bulletinValues);
					console.log($scope.bulletinValues.fromSerials);
					console.log($scope.bulletinValues.toSerials);
					$http(
							{
								method : 'POST',
								url : 'http://localhost:8090/ibct/Bulletin/Update',
								dataType : 'json',
								data : JSON
										.stringify({
											"category" : $scope.bulletinValues.Category.codeDescription,
											"bulletinNum" : $scope.bulletinValues.Bulletin,
											"complianceLevel" : $scope.bulletinValues.ComplianceLevel,
											"trackImplimentationPlan" : $scope.bulletinValues.TrackImplementationPlan,
											"significant" : $scope.bulletinValues.Significant,
											"voucherProgram" : $scope.bulletinValues.VoucherProgram,
											"remarks" : $scope.bulletinValues.Remarks,
											"bulletinTypeCode" : $scope.bulletinValues.BulletinTypeCode,
											"latestRevId" : $scope.bulletinValues.Revision,
											"createdBy" : "502353971",
											"productLine" : $scope.bulletinValues.ProductLine,
											"description" : $scope.bulletinValues.Description,
											"revision" : $scope.bulletinValues.Revision,
											"createdBy" : "jai",
											"fromserials" : $scope.bulletinValues.fromSerials,
											"toserials" : $scope.bulletinValues.toSerials,
											"fieldImplementationMetric" : $scope.bulletinValues.fieldImplementationMetric,
											"revisionDate" : $scope.bulletinValues.RevDate
										}),
								headers : {
									'Content-Type' : 'application/json'
								}
							}).success(
							function(data, status, headers, config) {
								// this callback will be called
								// asynchronously
								// when the response is available
								alert('Updated record successfully');
								console.log(data);
							}).error(
							function(data, status, headers, config) {
								// called asynchronously if an error occurs
								// or server returns response with an error
								// status.
								console.log(data);
							});
				}
			}
			$scope.serialNumber = [];

			$scope.addSN = function(fromSN, toSN) {
				console.log("in addSn");
				if ((fromSN.length == 1) && toSN) {
					if (fromSN >= toSN) {
						alert("To Serial Number should be greater than from Serial Number")
					} else {
						$scope.serialNumber.push({
							fromSNum : fromSN[0],
							toSNum : toSN
						});
					}
				}

				else if (fromSN.length > 1) {

					for (i = 0; i < fromSN.length; i++) {
						$scope.serialNumber.push({
							fromSNum : fromSN[i],
							toSNum : ""
						});
					}
				}
				console.log($scope.serialNumber);
			}
			$scope.removeItem = function(index){
			    $scope.serialNumber.splice(index, 1);
			  }
			function getBulletinTypeCode(bulletintype) {
				if (bulletintype == "PRODUCT BULLETIN") {
					return 20000043;
				} else if (bulletintype == "SERVICE BULLETIN") {
					return 20000042;
				} else if (bulletintype == "SYSTEM BULLETIN") {
					return 2726;
				} else {
					return 0;
				}
			}

			function getDescriptionFromCode(revision) {
				$scope.local = '';
				console.log(revision.categoryCode);
				$http
						.get(
								'http://localhost:8090/ibct/Bulletin/Codes/'
										+ revision.categoryCode)
						.then(
								function(response) {
									console
											.log(response.data.data.codeDescription);
									$scope.local = response.data.data.codeDescription;
								});
				return $scope.local;
			}
			function getFields(input, field) {
				return input.map(function(o) {
					return o[field];
				});
			}
			
			
				

$scope.clearFormControlFields = function() {
	var elements = document.getElementsByTagName("input");
	var dropdowns = document.getElementsByTagName("select");
	var textboxes = document
			.getElementsByTagName("textarea");
	var i = 0
	for (i = 0; i < elements.length; i++) {
		if (elements[i].type == "text") {
			elements[i].value = "";
		}
		if (elements[i].type == "checkbox") {
			elements[i].checked = elements[i].defaultChecked;
		}
		if (elements[i].type == "date") {
			elements[i].value = "";
		}

	}
	for (i = 0; i < dropdowns.length; i++) {
		if (dropdowns[i].type == "select-one") {
			dropdowns[i].value = "";
		}
		if (dropdowns[i].type == "select-multiple") {
			dropdowns[i].value = [];
		}

	}
	for (i = 0; i < textboxes.length; i++) {
		if (textboxes[i].type == "textarea") {
			textboxes[i].value = "";
		}
	}

}
		});	
/*******************************************************************************
 * CANCEL CONTROLLER
 ******************************************************************************/
app
		.controller(
				'cancelController',
				function($scope, $http) {
					// $scope.productLine = [];

					$http.get('http://localhost:8090/ibct/Product').then(
							function(response) {

								$scope.productLines = response.data.data;
							});
					$http
							.get(
									'http://localhost:8090/ibct/Bulletin/BulletinTypes')
							.then(function(response) {
								console.log(response.data.data);
								$scope.bulletinTypes = response.data.data;
							});

					$scope.fillBulletins = function() {

						if (this.cancelController.bulletinTypes
								&& this.cancelController.productLines.productLine) {
							$http(
									{
										method : 'POST',
										url : 'http://localhost:8090/ibct/Bulletin/Bulletins',
										dataType : 'json',
										data : JSON
												.stringify({
													"bulletinTypeCode" : getBulletinTypeCode(this.cancelController.bulletinTypes),
													"productLine" : this.cancelController.productLines.productLine
												}),
										headers : {
											'Content-Type' : 'application/json'
										}
									}).success(
									function(data, status, headers, config) {
										// this callback will be called
										// asynchronously
										// when the response is available
										$scope.bulletinNumbers = data.data;
										$scope.bulletins = data.data;
										alert('Cancelled bulletin successfully.');
									}).error(
									function(data, status, headers, config) {
										// called asynchronously if an error
										// occurs
										// or server returns response with an
										// error
										// status.
										alert('There was an error cancelling your bulletin. Please try again later.');
										console.log(status);
									});
						}
					}
					$scope.cancelBulletin = function(status) {
						if (this.cancelController.bulletinNumbers.bulletinStatus == 'EFFECTIVE') {
							console.log(this.cancelController.bulletinNumbers);
							$http(
									{
										method : 'POST',
										url : 'http://localhost:8090/ibct/Bulletin/CancelBulletin',
										dataType : 'json',
										data : JSON
												.stringify({
													"bulletinNum" : this.cancelController.bulletinNumbers.bulletinNum
												}),
										headers : {
											'Content-Type' : 'application/json'
										}
									}).success(
									function(data, status, headers, config) {
										// this callback will be called
										// asynchronously
										// when the response is available
										$scope.fillBulletins();
									}).error(
									function(data, status, headers, config) {
										// called asynchronously if an error
										// occurs
										// or server returns response with an
										// error
										// status.
										console.log(status);
									});
						}
					}

					function getBulletinTypeCode(bulletintype) {
						if (bulletintype == "PRODUCT BULLETIN") {
							return 20000043;
						} else if (bulletintype == "SERVICE BULLETIN") {
							return 20000042;
						} else if (bulletintype == "SYSTEM BULLETIN") {
							return 2726;
						} else {
							return 0;
						}
					}

				});
