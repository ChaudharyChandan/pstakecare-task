angular.module('PSTakeCareApp')
	.factory('hospitalService', ['$http','$q', function($http, $q){
		var deferred = $q.defer();
		var getHospitalList = function() {
			return {
				$http({
					method: 'GET',
					url: '/api/hospitals'
				})
				.success(function(data) {
					deferred.resolve(data);
				})
				.error(function() {
					deferred.reject("Failed to get data");
				})
				return deferred.promise;
			}
		}
		var selectedHospital; 
		var setSelectedHospital = function(hospital){
			selectedHospital = hospital;
		}
		var getSelectedHospital = function(){
			return selectedHospital;
		}
		
	return {
		getHospitalList: getHospitalList,
		setSelectedHospital: setSelectedHospital,
		getSelectedHospital: getSelectedHospital
	}
}]);