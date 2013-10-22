/* Four51 Global Namespace */

four51.app.factory('$451', function() {
	function json_filter(input, options, op) {
		if (input == null || options == null) return;
		var result = [];

		angular.forEach(input, function(row) {
            if (row[options.Property] === undefined && !options instanceof Array) return;

			var checkRow = function(opt){
				if ((row[opt.Property].toString()).toLowerCase() === (opt.Value.toString()).toLowerCase()){
					return row;
				}
			}

			var add;
			if (options instanceof Array){ //does an OR on the list of conditions. could add to it to optionally have OR/AND
				for(var i = 0; i < options.length; i++){
					add = checkRow(options[i]);
					if(add)
						break;
				}
			}else{
				add = checkRow(options);
			}

			if(add){
				result.push(row);
				if(op) op(row)
			}
		});
		return result;
	}

    function arrayContainsValue(array, value) {
        if (angular.isArray(value)) {
            var found = false;
            angular.forEach(value, function(v) {
                found = !found ? array.indexOf(v) > -1 : found;
            })
            return found;
        }
        else
            return array.indexOf(value) > -1;
    }


	return {
		debug: true,
		appname: four51.app.name,
		api: function(path) {
            //todo: get appname with out using window?
			var apiName = four51.app.ApiAppName ? four51.app.ApiAppName : window.location.pathname.split('/')[1];
            //return '/api/' + apiName + "/" + path;
			//return 'http://192.168.101.175/api/451Order/' + path;
			return 'http://api.four51.com/api/451Order/' + path;
		},
		filter: function(input, options, op) {
			return json_filter(input, options, op);
		},
        contains: function(array, value) {
            return arrayContainsValue(array, value);
        }
	};
});
