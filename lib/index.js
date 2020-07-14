const fs = require('fs');

function callback(options) {
	var content = '';
	for(var option in options) {
		content += "@" + option + ": '" + options[option] + "';\n";
	}
	fs.readFile(__dirname + '/../styles/config.less', 'utf8', (err, data) => {
		if (err) throw err;
		if (data === content) return;

		fs.writeFile(__dirname + '/../styles/config.less', content, (err) => {
			if (err) throw err;
			atom.packages.disablePackage('atom-gedit-syntax');
			atom.packages.enablePackage('atom-gedit-syntax');
		});
	});
}

module.exports = {
	initialize: () => {
		atom.config.observe('atom-gedit-syntax', callback);
	}
}
