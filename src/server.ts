// ██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗███████╗
// ██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
// ██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   ███████╗
// ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
// ██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   ███████║
// ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
// Imports                                                
import express = require('express');
import { Player } from './models/player';
import { get, selector, weeklySchedule } from './functions/helpers';
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

  app.get('/championstart', (request, response) => {
    response.writeHead(200, {
      'Content-Type': 'text/json',
      'Developer': 'Nicolaas Nel (NicmeisteR)',
      'Support-Development': 'https://ko-fi.com/nicmeister',
      'Twitter': 'https://twitter.com/NicmeistaR'
    });

    let metaData: any;
    
    fs.readFile(`./cache/metaData.json`, 'utf8', async (err: any, data: any) => {
      if (err) { throw err };

      metaData = JSON.parse(data);
      let responseObject: any;

      try 
      {
        responseObject = championstart(metaData); 
      } 
      catch (error) 
      {
        node.writeToFile("errors", "championstart", "txt", error);
        return "Failed on championstart";
      }
      finally
      {
        setTimeout(() => {
          fs.readFile(`./cache/LeaderBoard.json`, 'utf8', (err: any, data: any) => {
            let playlists:any = [];
            // data = JSON.parse(data.slice(0, -1) + ''); TODO: This is here because I left it here so deal with it. Jokes aside it was for formatting leaving for a while.
            data = JSON.parse(data);
            
            data.forEach((item: any) => {
              playlists.push({
                  Playlist: item.name,
                  CSR: item.details.Results[item.details.ResultCount - 1].Score.Csr,
                  Rank: item.details.Results[item.details.ResultCount - 1].Rank
              });
          });
          
          response.end(JSON.stringify(playlists), 'utf8');
          });
        }, 10000);
      }
    
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
  let metaData = await weeklySchedule();

  let date = new Date;
  let datetime = `Last Sync: ${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()} @ ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  // console.log('Running a task every day');
  node.writeToFile("./cache", "metaData", "json", JSON.stringify(metaData));
  node.writeToFile("./logs", "cronlog", "txt", datetime);
});