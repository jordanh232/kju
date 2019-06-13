const path = require('path');
const fs = require('fs-extra');
const _ = require('lodash');

const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const notifier = require('node-notifier');
const bot = require('./bot');
const utils = require('./utils');
const Logger = require('./logger');
const { CONFIG, USER_AGENTS } = require('./config');
const GOOGLE_COOKIES = require('./cookies');

const logger = new Logger();
logger.intro(CONFIG.instances);

const main = async () => {

	await fs.emptyDir(path.resolve('tmp'));

	for (let i = 1; i <= CONFIG.instances; i++) {
		await utils.timeout(1000);
		bot.splash(i.pad(), CONFIG);
	}

}
main();
