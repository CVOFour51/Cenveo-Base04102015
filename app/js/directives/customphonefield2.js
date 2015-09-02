four51.app.directive('customphonefield2', function() {
    var obj = {
        scope: {
            spec: '=',
            label: '@label',
            mask: '@mask'
        },
        restrict: 'E',
        templateUrl: 'partials/controls/customPhoneField2.html',
        controller: ['$scope', function($scope) {
            $scope.$watch('spec', function(n,o) {
                if (n) $scope.phoneNumber2 = $scope.spec.Value;
            });

            $scope.$watch('phoneNumber', function(value){
                if (value) {
                    $scope.spec.Value = value.substring(0, 3) + value.substring(3, 6) + value.substring(6, 10);
				}
                else if(value == ""){
                    $scope.spec.Value = "";
                }
            });
        }]
    };

    return obj;
});