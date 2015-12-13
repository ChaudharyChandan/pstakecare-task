angular.module('PSTakeCareApp')
	.controller('HospitalCtrl', [ '$scope', 'hospitalService', 'hospitalTimingService', function($scope, hospitalService,hospitalTimingService) {
		hospitalService.getHospitalList()
		.then(function(res){
			$scope.hospitals = angular.fromJson(res.data);
			hospitalTimingService.getHospitalOpeningTimings($scope.hospitals);
			//console.log($scope.hospitals);
		}, function(reason){
			console.log("Failed: " + reason);
		});
		$scope.setSelectedHospital = function(hospital){
			hospitalService.setSelectedHospital(hospital);
		}	
}]);