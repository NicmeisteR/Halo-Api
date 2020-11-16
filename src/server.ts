// ██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗███████╗
// ██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
// ██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   ███████╗
// ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
// ██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   ███████║
// ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
// Imports                                                
import express = require('express');
import { Player } from './models/player';
import { get, selector, weeklySchedule, weeklyScheduleLeaderboard } from './functions/helpers';
import { championstart } from './functions/haloapi';
const fs = require('fs');
const node = require('node-essentials');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config({ path: require('find-config')('.env') });

// ███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗ 
// ██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗
// ███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝
// ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗
// ███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║
// ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝
// Server                                             
function start() {

  app.use(cors());
  // Configuring body parser middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.post('/', async (request, response) => {
    response.writeHead(200, {
      'Content-Type': 'text/json',
      'Developer': 'Nicolaas Nel (NicmeisteR)',
      'Support-Development': 'https://ko-fi.com/nicmeister',
      'Twitter': 'https://twitter.com/NicmeistaR'
    });

    let query = await selector(request.body.query, request.body.gamertag);
    let playerObject = await get(request.body.token, query);
    let responseObject: any;

    try {
      responseObject = await query.function(playerObject, request.body.token);
    }
    catch (error) {
      console.log(error);
    }
    finally {
      response.end(JSON.stringify(responseObject))
    }

  });

  app.get('/metadata', async (request, response) => {
    response.writeHead(200, {
      'Content-Type': 'text/json',
      'Developer': 'Nicolaas Nel (NicmeisteR)',
      'Support-Development': 'https://ko-fi.com/nicmeister',
      'Twitter': 'https://twitter.com/NicmeistaR'
    });

    fs.readFile(`./cache/metaData.json`, 'utf8', (err: any, data: any) => {
      if (err) { throw err };
      console.log(data);  
      response.end(data);
    });

  });

  app.get('/csr-designations', async (request, response) => {
    response.writeHead(200, {
      'Content-Type': 'text/json',
      'Developer': 'Nicolaas Nel (NicmeisteR)',
      'Support-Development': 'https://ko-fi.com/nicmeister',
      'Twitter': 'https://twitter.com/NicmeistaR'
    });

    fs.readFile(`./cache/csr-designations.json`, 'utf8', (err: any, data: any) => {
      if (err) { throw err };
      console.log(data);  
      response.end(data);
    });

  });

  app.get('/championstart', async (request, response) => {
    response.writeHead(200, {
      'Content-Type': 'text/json',
      'Developer': 'Nicolaas Nel (NicmeisteR)',
      'Support-Development': 'https://ko-fi.com/nicmeister',
      'Twitter': 'https://twitter.com/NicmeistaR'
    });

    fs.readFile(`./cache/LeaderBoard.json`, 'utf8', (err: any, data: any) => {
      if (err) { throw err };
      console.log(data);  
      response.end(data);
    });

  });

  app.listen(process.env.PORT, () => console.log(`API now available on http://localhost:${process.env.PORT}`));
}

// let app = express();
const app: express.Application = express();
start();

// # ┌────────────── second (optional)
// # │ ┌──────────── minute
// # │ │ ┌────────── hour
// # │ │ │ ┌──────── day of month
// # │ │ │ │ ┌────── month
// # │ │ │ │ │ ┌──── day of week
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// # * * * * * *
cron.schedule('* * */24 * * *', async () => {
// cron.schedule('*/10 * * * * *', async () => {
  await weeklySchedule();
  // await weeklySchedule().then((async (res) => await weeklyScheduleLeaderboard(res)));

  let date = new Date;
  let datetime = `Last Sync: ${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()} @ ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  // console.log('Running a task every day');
  // node.writeToFile("./cache", "leaderboardData", "json", JSON.stringify(leaderboardData));
  node.writeToFile("./logs", "cronlog", "txt", datetime);
});