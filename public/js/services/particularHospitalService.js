angular.module('PSTakeCareApp')
	.factory('ParticularHospitalService',['$http','$q','$routeParams', function($http, $q, $routeParams){
		var deferred = $q.defer();
		var getHospitalDetails = function(){
			return $http({
				method: 'GET',
				url: '/api/hospitals/' + $routeParams.name,
			})
			.success(function(data){
				deferred.resolve(data);
			})
			.error(function(data){
				deferred.reject('Failed to get data');
			})
			return deferred.promise;
		}
		return {
			getHospitalDetails: getHospitalDetails
		}
	}]);