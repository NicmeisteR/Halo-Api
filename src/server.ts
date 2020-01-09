// ██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗███████╗
// ██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
// ██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   ███████╗
// ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
// ██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   ███████║
// ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
//                                                         
import express = require('express');
const node = require('node-essentials');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({ path: require('find-config')('.env') });
import { Player } from './models/player';

// ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
// ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
// █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
// ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
// ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
// ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
//             
async function get(gamertag: string, token: string){
  let player : any;
  try {
    player = await node.get(`https://www.haloapi.com/stats/h5/servicerecords/arena?players=${gamertag}`,["ocp-apim-subscription-key", token]).then(console.log("Retrieved: Player"));
    
  } catch (error) {
    console.log(error);
  }
  finally{
    return new Promise<Player>((resolve, reject) => {
      player = JSON.parse(player);
      return resolve(player);
    });
  }
}

async function stats(player: Player) {
  
  let root = {
     Gamertag: player.Results[0].Result.PlayerId.Gamertag,
     Xp: player.Results[0].Result.Xp,
     SpartanRank: player.Results[0].Result.SpartanRank,
     HighestCsrAttained: {
      Tier: player.Results[0].Result.ArenaStats.HighestCsrAttained?.Tier,
      DesignationId: player.Results[0].Result.ArenaStats.HighestCsrAttained?.DesignationId,
      Csr: player.Results[0].Result.ArenaStats.HighestCsrAttained?.Csr,
      PercentToNextTier: player.Results[0].Result.ArenaStats.HighestCsrAttained?.PercentToNextTier,
      Rank: player.Results[0].Result.ArenaStats.HighestCsrAttained?.Rank,
     },
     Stats: {
      TotalKills: player.Results[0].Result.ArenaStats.TotalKills,
      TotalHeadshots: player.Results[0].Result.ArenaStats.TotalHeadshots,
      TotalMeleeKills: player.Results[0].Result.ArenaStats.TotalMeleeKills,
      TotalAssassinations: player.Results[0].Result.ArenaStats.TotalAssassinations,
      TotalGroundPoundKills: player.Results[0].Result.ArenaStats.TotalGroundPoundKills,
      TotalShoulderBashKills: player.Results[0].Result.ArenaStats.TotalShoulderBashKills,
      TotalPowerWeaponKills: player.Results[0].Result.ArenaStats.TotalPowerWeaponKills,
      TotalDeaths: player.Results[0].Result.ArenaStats.TotalDeaths,
      TotalAssists: player.Results[0].Result.ArenaStats.TotalAssists,
      TotalGamesCompleted: player.Results[0].Result.ArenaStats.TotalGamesCompleted,
      TotalGamesWon: player.Results[0].Result.ArenaStats.TotalGamesWon,
      TotalGamesLost: player.Results[0].Result.ArenaStats.TotalGamesLost,
      TotalGamesTied: player.Results[0].Result.ArenaStats.TotalGamesTied,
      TotalGrenadeKills: player.Results[0].Result.ArenaStats.TotalGrenadeKills,
      TotalSpartanKills: player.Results[0].Result.ArenaStats.TotalSpartanKills,
     },
     TotalTimePlayed: player.Results[0].Result.ArenaStats.TotalTimePlayed,
  };

  return new Promise((resolve, reject) => {
    resolve(root);
  });
}

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