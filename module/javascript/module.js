forge['tabbar'] = {
	'show': function ( success, error) {
		forge.internal.call("tabbar.show", {}, success, error);
	},
	'hide': function (success, error) {
		forge.internal.call("tabbar.hide", {}, success, error);
	},
	'addButton': function (params, success, error) {
		if (params.icon && params.icon[0] === "/") {
			params.icon = params.icon.substr(1);
		}
		forge.internal.call("tabbar.addButton", params, function (id) {
			success && success({
				remove: function (success, error) {
					forge.internal.call("tabbar.removeButton", {id: id}, success, error);
				},
				setActive: function (success, error) {
					forge.internal.call("tabbar.setActive", {id: id}, success, error);
				},
				onPressed: {
					addListener: function (callback, error) {
						forge.internal.addEventListener('tabbar.buttonPressed.'+id, callback);
					}
				}
			});
		}, error);
	},
	'removeButtons': function (success, error) {
		forge.internal.call("tabbar.removeButtons", {}, success, error);
	},
	'setTint': function (color, success, error) {
		forge.internal.call("tabbar.setTint", {color: color}, success, error);
	},
	'setActiveTint': function (color, success, error) {
		forge.internal.call("tabbar.setActiveTint", {color: color}, success, error);
	},
	'setInactive': function (success, error) {
		forge.internal.call("tabbar.setInactive", {}, success, error);
	}
};