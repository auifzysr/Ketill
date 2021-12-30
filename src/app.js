'use strict';

const { App } = require('@slack/bolt');

const dotenv = require('dotenv');
const path = require('path');

const tz = require('./tz');

const result = dotenv.config({
	path: path.resolve(process.cwd(), '.env')
});
if (result.error) {
	throw result.error
}

const app = new App({
	token: process.env.SLACK_BOT_TOKEN,
	signingSecret: process.env.SLACK_SIGNING_SECRET,
	appToken: process.env.SLACK_APP_TOKEN,
	port: process.env.PORT || 3000
});

const tzlist = tz.tzlist;
const pattern = new RegExp(Object.keys(tz.tzlist).join('|'), 'g');

app.message(pattern, async ({ message, say }) => {
	for(const tz of message.text.match(pattern)) {
		const hour_diff = tzlist[tz];
		const response_body = `The time difference between *${tz}* and UTC is *${hour_diff} hour(s)*.`;
		await say(response_body);
	}
});

(async () => {
	await app.start();
	console.log('it\'s running');
})();
