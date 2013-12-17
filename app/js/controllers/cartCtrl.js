four51.app.controller('CartViewCtrl', function ($scope, $location, $451, Order, OrderConfig, User) {
    $scope.continueShopping = function() {
	    if (confirm('Do you want to save changes to your order before continuing?') == true)
		    $scope.saveChanges(function() { $location.path('catalog') });
	    else
		    $location.path('catalog');
    };



	$scope.cancelOrder = function() {
		if (confirm('Are you sure you wish to cancel your order?') == true) {
			$scope.displayLoadingIndicator = true;
			Order.delete($scope.currentOrder, function(){
				$scope.currentOrder = null;
				$scope.user.CurrentOrderID = null;
				User.save($scope.user, function(){
					$location.path('catalog');
				});
				$scope.displayLoadingIndicator = false;
			});
		}
	};

	$scope.saveChanges = function(callback) {
		if($scope.currentOrder.LineItems.length == $451.filter($scope.currentOrder.LineItems, {Property:'Selected', Value: true}).length) {
			$scope.cancelOrder();
		}
		else {
			$scope.displayLoadingIndicator = true;
			Order.save($scope.currentOrder, function(data) {
				$scope.currentOrder = data;
				OrderConfig.costcenter(data, $scope.user).address(data, $scope.user);
				$scope.displayLoadingIndicator = false;
				if (callback) callback();
                $scope.showSuccessAlert = true;
			});
		}
	};

	$scope.removeItem = function(item) {
		item.Selected = true;
		$scope.saveChanges();
	}

    $scope.checkOut = function() {
	    $scope.displayLoadingIndicator = true;
        Order.save($scope.currentOrder, function(data) {
            $scope.currentOrder = data;
            $location.path('checkout');
            $scope.displayLoadingIndicator = false;
        });
    };

	$scope.$watch('currentOrder.LineItems', function(newval) {
		var newTotal = 0;
        if (!$scope.currentOrder) return newTotal;
		angular.forEach($scope.currentOrder.LineItems, function(item){
			newTotal += item.LineTotal;
		});
		$scope.currentOrder.Subtotal = newTotal;
	}, true);

    $scope.copyAddressToAll = function() {
        angular.forEach($scope.currentOrder.LineItems, function(n) {
            n.DateNeeded = $scope.currentOrder.LineItems[0].DateNeeded;
        });
    };

	$scope.copyCostCenterToAll = function() {
		angular.forEach($scope.currentOrder.LineItems, function(n) {
			n.CostCenter = $scope.currentOrder.LineItems[0].CostCenter;
		});
	};

    $scope.onPrint = function()  {
	    window.print();
    };

});