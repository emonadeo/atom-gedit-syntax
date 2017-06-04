const fs = require('fs');

function callback(value) {
	var content = '';
	for(var ioption in config) {
		if(ioption == this) {
			content += "@" + ioption + ": '" + value + "';\n";
		} else {
			content += "@" + ioption + ": '" + config[ioption] + "';\n";
		}
	}
	fs.writeFile(__dirname + '/../styles/config.less', content, () => {
		const pack = atom.packages.getLoadedPackage('atom-gedit-syntax');
	    if (pack) {
	      pack.deactivate();
	      setImmediate(() => pack.activate());
	    }
	});
}

var config = atom.config.get('atom-gedit-syntax');
for(var option in config) {
	atom.config.observe('atom-gedit-syntax.' + option, callback.bind(option));
}
