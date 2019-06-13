const path = require('path');
const fs = require('fs-extra');
const _ = require('lodash');
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const notifier = require('node-notifier');

const utils = require('./utils');
const bot = require('./bot');
const Logger = require('./logger');
const { CONFIG, USER_AGENTS } = require('./config');
const GOOGLE_COOKIES = require('./cookies');
const PORT=8080; 

const logger = new Logger();

const run = async (num_windows) => {

	await fs.emptyDir(path.resolve('tmp'));
	logger.intro(num_windows);
	
	for (let i = 1; i <= num_windows; i++) {
		await utils.timeout(1000);
		bot.splash(i.pad(), CONFIG);
	}

}

module.exports = {
	run
};
