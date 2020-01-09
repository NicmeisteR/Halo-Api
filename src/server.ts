// ██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗███████╗
// ██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
// ██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   ███████╗
// ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
// ██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   ███████║
// ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
// Imports                                                
import express = require('express');
import { Player } from './models/player';
import { stats } from './functions/haloapi';
import { get } from './functions/helpers';
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({ path: require('find-config')('.env') });

// ███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗ 
// ██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗
// ███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝
// ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗
// ███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║
// ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝
// Server                                             
function start(){

  app.use(cors());
  // Configuring body parser middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.post('/', async (request, response) => {
    response.writeHead(200, {
      'Content-Type': 'text/json', 
      'Developer': 'Nicolaas Nel (NicmeisteR)',
      'Support-Development' : 'https://ko-fi.com/nicmeister',
      'Twitter': 'https://twitter.com/FinalNecessity'
    });

    let playerObject: Player = await get(request.body.gamertag, request.body.token);
    let responseObject: any;

    try {
        responseObject = await stats(playerObject);
    }
    catch (error) {
      console.log(error);
    }
    finally{
      response.end(JSON.stringify(responseObject))
    }

  })
  app.listen(process.env.PORT, () => console.log(`API now available on http://localhost:${process.env.PORT}`));
}

// let app = express();
const app: express.Application = express();
start();