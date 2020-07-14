const fs = require('fs');

function callback(value) {
	var content = '';
	var config = atom.config.get('atom-gedit-syntax');
	for(var ioption in config) {
		if(ioption == this) {
			content += "@" + ioption + ": '" + value + "';\n";
		} else {
			content += "@" + ioption + ": '" + config[ioption] + "';\n";
		}
	}
	fs.writeFile(__dirname + '/../styles/config.less', content, () => {
		atom.packages.disablePackage('atom-gedit-syntax');
		atom.packages.enablePackage('atom-gedit-syntax');
	});
}

module.exports = {
	initialize: (state) => {
		for(var option in atom.config.get('atom-gedit-syntax')) {
			atom.config.observe('atom-gedit-syntax.' + option, callback.bind(option));
		}
	}
}
