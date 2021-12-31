'use strict';

import path = require('path');
import fs = require('fs');

const tzListFile = 'tzlist.json'

export const tzlist = ((tzListPath) => {
	return JSON.parse(fs.readFileSync(tzListPath).toString());
})(path.resolve(process.cwd(), tzListFile));