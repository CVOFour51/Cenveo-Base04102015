four51.app.factory('Order', function($resource, $rootScope, $451) {
	function _then(fn, data) {
		if (angular.isFunction(fn))
			fn(data);
	}

	function _extend(order) {
		order.isEditable = order.Status == 'Unsubmitted' || order.Status == 'Open';
	}

	var _get = function(id, success) {
		var currentOrder = store.get('451Cache.Order.' + id);
		currentOrder ? (function() { _extend(currentOrder);	_then(success, currentOrder); })() :
	        $resource($451.api('order')).get({'id': id }).$promise.then(function(o) {
		        store.set('451Cache.Order.' + id, o);
	            _then(success, o);
	        });
    }

    var _save = function(order, success) {
        $resource($451.api('order')).save(order).$promise.then(function(o) {
	        store.set('451Cache.Order.' + o.ID, o);
	        _extend(o);
            _then(success, o);
        });
    }

    var _delete = function(order, success) {
        $resource($451.api('order')).delete().$promise.then(function() {
	        store.remove('451Cache.Order.' + order.ID);
           _then(success);
        });
    }

    var _submit = function(order, success) {
        $resource($451.api('order'), { }, { submit: { method: 'PUT' }}).submit(order).$promise.then(function(o) {
	        store.set('451Cache.Order.' + o.ID);
	        _extend(o);
            _then(success,o);
        });
    }

    return {
        get: _get,
        save: _save,
        delete: _delete,
        submit: _submit
    }
});