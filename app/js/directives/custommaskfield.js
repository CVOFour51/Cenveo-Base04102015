four51.app.directive('custommaskfield', function() {
    var obj = {
        scope: {
            customfield : '=',
            changed: '=',
            hidesuffix: '@',
            hideprefix: '@',
            cmask: '@'
        },
        restrict: 'E',
        templateUrl: 'partials/controls/customMaskField.html'
    };
    return obj;
});

four51.app.directive('customcasefield', function() {
    var obj = {
        scope: {
            customfield : '=',
            changed: '=',
            hidesuffix: '@',
            hideprefix: '@',
            case: '@'
        },
        restrict: 'E',
        templateUrl: 'partials/controls/customCaseField.html',
        controller: ['$scope', function($scope) {
            $scope.$watch('customfield.Value', function(val) {
                if (!val) return;
                $scope.customfield.Value =  val[$scope.case == 'upper' ? 'toUpperCase' : 'toLowerCase']();
            });
        }]
    };
    return obj;
});

four51.app.directive('cmask', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attr, ctrl) {

            if (attr.cmask)
                elem.cmask(attr.cmask, { placeholder: attr.cmaskPlaceholder });
        }
    };
});