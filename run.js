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

const run = async (runners) => {

	await fs.emptyDir(path.resolve('tmp'));
	for (i = 0;  i<runners.length; i++){
		await utils.timeout(2500);
		instanceArray["id"+runners[i]].status="Started"
		bot.splash(runners[i].pad(), CONFIG, runners[i]);
	}
	
}

module.exports = {
	run
};
