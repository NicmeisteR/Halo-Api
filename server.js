// ██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗███████╗
// ██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
// ██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   ███████╗
// ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
// ██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   ███████║
// ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
//                                                         
const express = require('express');
const node = require('node-essentials');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

// ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
// ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
// █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
// ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
// ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
// ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
//             
async function get(gamertag, token){
  let player;
  try {
    player = await node.get(`https://www.haloapi.com/stats/h5/servicerecords/arena?players=${gamertag}`,["ocp-apim-subscription-key", token]).then(console.log("Retrieved: Player"));
    
  } catch (error) {
    console.log(error);
  }
  finally{
    return new Promise((resolve, reject) => {
      player = JSON.parse(player);
      player = player.Results[0];
      console.log(player.Id);
      return resolve(player);
    });
  }
}

async function stats(player) {
  
  let root = {
     Gamertag: player.Result.PlayerId.Gamertag,
     Xp: player.Result.Xp,
     SpartanRank:player.Result.SpartanRank,
     HighestCsrAttained: {
      Tier: player.Result.ArenaStats.HighestCsrAttained.Tier,
      DesignationId:player.Result.ArenaStats.HighestCsrAttained.DesignationId,
      Csr: player.Result.ArenaStats.HighestCsrAttained.Csr,
      PercentToNextTier: player.Result.ArenaStats.HighestCsrAttained.PercentToNextTier,
      Rank: player.Result.ArenaStats.HighestCsrAttained.Rank,
     },
     Stats: {
      TotalKills:player.Result.ArenaStats.TotalKills,
      TotalHeadshots:player.Result.ArenaStats.TotalHeadshots,
      TotalMeleeKills: player.Result.ArenaStats.TotalMeleeKills,
      TotalAssassinations: player.Result.ArenaStats.TotalAssassinations,
      TotalGroundPoundKills: player.Result.ArenaStats.TotalGroundPoundKills,
      TotalShoulderBashKills: player.Result.ArenaStats.TotalShoulderBashKills,
      TotalPowerWeaponKills: player.Result.ArenaStats.TotalPowerWeaponKills,
      TotalDeaths: player.Result.ArenaStats.TotalDeaths,
      TotalAssists: player.Result.ArenaStats.TotalAssists,
      TotalGamesCompleted: player.Result.ArenaStats.TotalGamesCompleted,
      TotalGamesWon: player.Result.ArenaStats.TotalGamesWon,
      TotalGamesLost: player.Result.ArenaStats.TotalGamesLost,
      TotalGamesTied: player.Result.ArenaStats.TotalGamesTied,
      TotalGrenadeKills: player.Result.ArenaStats.TotalGrenadeKills,
      TotalSpartanKills: player.Result.ArenaStats.TotalSpartanKills,
     },
     TotalTimePlayed: player.Result.ArenaStats.TotalTimePlayed,
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

    let player = await get(request.body.gamertag, request.body.token);

    try {
      test = await stats(player);
    }
    catch (error) {
      console.log(error);
    }
    finally{
      response.end(JSON.stringify(test))
    }

  })
  app.listen(process.env.PORT, () => console.log(`API now available on http://localhost:${process.env.PORT}`));
}

let app = express();
start();