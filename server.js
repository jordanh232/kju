const express = require('express')
const app = express()
const port = 3000

const path = require('path');
const fs = require('fs-extra');
const _ = require('lodash');
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const notifier = require('node-notifier');

const utils = require('./utils');
const bot = require('./bot');
const runner = require('./run');
const Logger = require('./logger');
const { CONFIG, USER_AGENTS } = require('./config');
const GOOGLE_COOKIES = require('./cookies');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', function(req, res) {
    res.sendFile('/Users/jordanho/Downloads/kju-master/index.html');
});

app.post('/create-windows', function (req, res) {
    // var windows = req.body.num_windows
    // runner.run(windows)
    res.send('POST Request <a href="*">test</a>');
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))