'use strict';

const path = require('path');
const fs = require('fs');

const tzListFile = 'tzlist.json'

const tzlist = ((tzListPath) => {
	return JSON.parse(fs.readFileSync(tzListPath));
})(path.resolve(process.cwd(), tzListFile));

module.exports = {
	tzlist: tzlist
}
