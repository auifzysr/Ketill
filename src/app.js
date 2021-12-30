'use strict';

const { App } = require('@slack/bolt');
const dotenv = require('dotenv');
const path = require('path');

const fs = require('fs');

const tzListFile = 'tzlist.json'

const getTZList = (tzlistPath) => {
	let tzList = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), tzListFile)));

	return tzList;
};

console.log(getTZList(tzListFile));

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

app.message('hello', async ({ message, say }) => {
	await say(`hey there <@${message.user}>!`);
});

(async () => {
	await app.start();
	console.log('it\'s running');
})();
