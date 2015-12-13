
angular.module('PSTakeCareApp')
	.controller('HospitalDetailsCtrl', ['$scope','ParticularHospitalService','hospitalTimingService','hospitalService',function ($scope, ParticularHospitalService, hospitalTimingService,hospitalService) {
	// $scope.selectedHospital = hospitalService.getSelectedHospital();
	if(hospitalService.getSelectedHospital()){
		$scope.hospital = hospitalService.getSelectedHospital();
	} else {
		ParticularHospitalService.getHospitalDetails()
		.then(function(res){
			$scope.hospital = angular.fromJson(res.data);
			hospitalTimingService.getHospitalOpeningTimings($scope.hospital);
			$scope.hospital = $scope.hospital[0];
		},function(reason){
			console.log("Failed: " + reason);
		});
	}
}]);

