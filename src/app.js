'use strict';

const { App } = require('@slack/bolt');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

const result = dotenv.config({
	path: path.resolve(process.cwd(), '.env')
});
if (result.error) {
	throw result.error
}

const tzListFile = 'tzlist.json'
const getTZList = (tzListPath) => {
	return JSON.parse(fs.readFileSync(tzListPath));
};
const tzlist = getTZList(path.resolve(process.cwd(), tzListFile));
const pattern = new RegExp(Object.keys(tzlist).join('|'), 'g');

const app = new App({
	token: process.env.SLACK_BOT_TOKEN,
	signingSecret: process.env.SLACK_SIGNING_SECRET,
	appToken: process.env.SLACK_APP_TOKEN,
	port: process.env.PORT || 3000
});

app.message(pattern, async ({ message, say }) => {
	for(const tz of message.text.match(pattern)) {
		const hour_diff = tzlist[tz];
		const response_body = `The time difference between *${tz}* and UTC is ${hour_diff} hour(s).`;
		await say(response_body);
	}
});

(async () => {
	await app.start();
	console.log('it\'s running');
})();
