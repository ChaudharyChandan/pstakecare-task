angular.module('PSTakeCareApp')
	.controller('HomeCtrl', ['$scope', '$state',function ($state, $scope) {
		$scope.name = "Chandan Kumar";
		$scope.add = function(a, b){
			a+b;
		}
}

] );