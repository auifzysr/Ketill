const { App } = require('@slack/bolt');
const dotenv = require('dotenv');
const path = require('path');

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
