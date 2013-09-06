exports.merge = function(base, updates) {
	for (var attrname in updates) {
		base[attrname] = updates[attrname];
	}
};
