"use strict";

import { App, GenericMessageEvent } from "@slack/bolt";

import dotenv = require("dotenv");
import path = require("path");

import tz = require("./tz");

const result = dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});
if (result.error) {
  throw result.error;
}

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  port: Number(process.env.PORT) || 3000,
});

const tzlist = tz.tzlist;
const pattern = new RegExp(Object.keys(tz.tzlist).join("|"), "g");

// temporary workaround
// https://github.com/slackapi/bolt-js/issues/904
app.message(pattern, async ({ message, say }) => {
  for (const tz of (message as GenericMessageEvent).text?.match(pattern) ||
    []) {
    const hourDiff = tzlist[tz];
    const responseBody = `The time difference between *${tz}* and UTC is *${hourDiff} hour(s)*.`;
    await say(responseBody);
  }
});

(async () => {
  await app.start();
  console.log("it's running");
})();
