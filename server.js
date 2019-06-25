const express = require('express')
const app = express()
const port = 80

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
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.json());
app.use(express.urlencoded({    
  extended: true
}));     
app.use(express.static(path.join(__dirname, 'public')));

instanceArray = {}; 

app.get('/', function(req, res) {
    res.sendFile('/Users/jordanho/bot/kju/index.html');
});

app.post('/create-windows', function (req, res) {
    var windows = parseInt(req.body.windows);
    var total_windows = parseInt(req.body.total_windows);
    total_windows+=1;
    windows+=total_windows;
    console.log(total_windows);
    for (let i = total_windows; i < windows; i++) {
      instanceArray["id" + i]={id: i, status: "Stopped", mypage : "", browser : ""};
    }
    res.send('POST Request');
});

app.post('/status', function (req, res) {
    statusJSON = "";
    for (var key in instanceArray) {
      statusJSON += "{\"status\" : \"" + instanceArray[key].status + "\", \"id\" : \"" + instanceArray[key].id + "\" },";
    }
    statusJSON = statusJSON.slice(0,-1);
    statusJSON = "[" + statusJSON;
    statusJSON += "]";
    res.json(statusJSON);
});

app.post('/start', function (req, res) {
    var instance = []
    instance[0] = parseInt(req.body.id);
    console.log(instance);
    runner.run(instance);
    res.send('POST Request');
});

app.post('/remove', function (req, res) {
  var reInstance = req.body.id;
  console.log(reInstance);
  if (instanceArray["id"+reInstance].mypage){
    instanceArray["id"+reInstance].mypage.close();
    instanceArray["id"+reInstance].browser.close();
  }
  delete instanceArray["id"+reInstance];
  res.send('POST Request');
});

app.post('/view', function (req, res) {
  var viewInstance = parseInt(req.body.id);
  console.log(viewInstance);
  if (instanceArray["id"+viewInstance].mypage){
    instanceArray["id"+viewInstance].mypage.bringToFront();
  }
  res.send('POST Request');
});

app.post('/start-all', function (req, res) {
    var windows = parseInt(req.body.total_windows)
    var runners=[];
    for (let i = 1; i <= windows; i++) {
      runners[i-1]=parseInt(instanceArray["id"+i].id);
    }
    runner.run(runners);
    res.send('POST Request');
});

app.post('/remove-all', function (req, res) {
    for (var key in instanceArray) {
      if(instanceArray[key].mypage){
        instanceArray[key].mypage.close();
      }
      if(instanceArray[key].browser){
        instanceArray[key].browser.close();
      }
      delete instanceArray[key];
    }
    res.send('POST Request');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))