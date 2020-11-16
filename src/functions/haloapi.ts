// ██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗███████╗
// ██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
// ██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   ███████╗
// ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
// ██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   ███████║
// ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
// Imports
const fs = require('fs');
const node = require('node-essentials');
import { Player } from '../models/player';
import { getPlaylistName, numberFormat, numDecFormat } from '../functions/helpers';
import { Query } from '../models/query';

// ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
// ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
// █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
// ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
// ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
// ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
// Functions
export async function arena(player: Player) {

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

/**
 * This returns the players ranks.
 *
 * @param {Player} player
 * @param {string} token
 * @returns playlistName
 */
export async function ranks(player: Player, token: string) {
    let playerPlaylist = player.Results[0].Result.ArenaStats.ArenaPlaylistStats;
    let playlistList = await get("https://haloapi.nicmeister.cloud/metadata");
    // TODO: @nicmeister read metadata from cache
    let csrDesignation = await get("https://www.haloapi.com/metadata/h5/metadata/csr-designations");

    let playlistName = await getPlaylistName(playerPlaylist, playlistList.playlists, csrDesignation) 

    // let root = {
    //     Gamertag: player.Results[0].Result.PlayerId.Gamertag,
    //     Xp: player.Results[0].Result.Xp,
    //     SpartanRank: player.Results[0].Result.SpartanRank,
    //     HighestCsrAttained: {
    //         Tier: player.Results[0].Result.ArenaStats.HighestCsrAttained?.Tier,
    //         DesignationId: player.Results[0].Result.ArenaStats.HighestCsrAttained?.DesignationId,
    //         Csr: player.Results[0].Result.ArenaStats.HighestCsrAttained?.Csr,
    //         PercentToNextTier: player.Results[0].Result.ArenaStats.HighestCsrAttained?.PercentToNextTier,
    //         Rank: player.Results[0].Result.ArenaStats.HighestCsrAttained?.Rank,
    //     },
    //     Stats: {
    //         TotalKills: player.Results[0].Result.ArenaStats.TotalKills,
    //         TotalHeadshots: player.Results[0].Result.ArenaStats.TotalHeadshots,
    //         TotalMeleeKills: player.Results[0].Result.ArenaStats.TotalMeleeKills,
    //         TotalAssassinations: player.Results[0].Result.ArenaStats.TotalAssassinations,
    //         TotalGroundPoundKills: player.Results[0].Result.ArenaStats.TotalGroundPoundKills,
    //         TotalShoulderBashKills: player.Results[0].Result.ArenaStats.TotalShoulderBashKills,
    //         TotalPowerWeaponKills: player.Results[0].Result.ArenaStats.TotalPowerWeaponKills,
    //         TotalDeaths: player.Results[0].Result.ArenaStats.TotalDeaths,
    //         TotalAssists: player.Results[0].Result.ArenaStats.TotalAssists,
    //         TotalGamesCompleted: player.Results[0].Result.ArenaStats.TotalGamesCompleted,
    //         TotalGamesWon: player.Results[0].Result.ArenaStats.TotalGamesWon,
    //         TotalGamesLost: player.Results[0].Result.ArenaStats.TotalGamesLost,
    //         TotalGamesTied: player.Results[0].Result.ArenaStats.TotalGamesTied,
    //         TotalGrenadeKills: player.Results[0].Result.ArenaStats.TotalGrenadeKills,
    //         TotalSpartanKills: player.Results[0].Result.ArenaStats.TotalSpartanKills,
    //     },
    //     TotalTimePlayed: player.Results[0].Result.ArenaStats.TotalTimePlayed,
    // };

    return new Promise((resolve, reject) => {
        resolve(playlistName);
    });
}

export async function xp(player: any){

    player = player.Results[0].Result;

    //build our reply object
    let spartanRank = player.SpartanRank;

    //XP
    let xpCur = player.Xp;
    let xpCurrent = numberFormat(player.Xp);

    //Xp functions
    let goal = numberFormat(50000000);
    let percentage = ((xpCur/50000000)*100).toFixed(0) +"%";

    let left = numberFormat(50000000 - xpCur);
    let warzone = numDecFormat((50000000 - xpCur)/12000);
    let arena = numDecFormat((50000000 - xpCur)/1800);
    let infection = numDecFormat((50000000 - xpCur)/5000);
    let dateNow = new Date(); 
    const dateDone = new Date("06/15/2021"); 

    // To calculate the time difference of two dates 
    let Difference_In_Time = dateDone.getTime() - dateNow.getTime(); 
    
    // To calculate the no. of days between two dates 
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
    
    // OBJECT
    let normalStats = {
        "Gamertag": player.PlayerId.Gamertag,
        "SpartanRank": spartanRank,
        "XpBreakdown": {
            "Current": xpCurrent,
            "Left": left,
            "Goal": goal,
            "Percentage": percentage,
            "PerDay": numDecFormat(((50000000 - xpCur) / Difference_In_Days)),
        },
        "MatchesLeft": {
            "Arena": arena,
            "Warzone": warzone,
            "Infection": infection
        }
    };

    return new Promise((resolve, reject) => {
        resolve(normalStats);
    });
}

export async function get(query: string) {
    let player: any;
    try {
        player = await node.get(query, ["ocp-apim-subscription-key", "f4bfe0061ba84032b87aeb1c00600dc3"]).then(console.log(`Retrieved Data.`));

    } catch (error) {
        console.log(error);
    }
    finally {
        return new Promise<any>((resolve, reject) => {
            player = JSON.parse(player);
            return resolve(player);
        });
    }
}

// export async function championstart(metaData: any){
    
//     let CurrentLeaderboard:any = [];

//     // metaData.forEach(async (item: any, i: number) => {
//     //     setTimeout(() => {
//     //       console.log(item);
          
//     //     }, i * 10000);
//     //   });

//     metaData.playlists.forEach((playlist: any, i: number) => {
//         let leaderboard: any;

//         setTimeout(async () => {
//             leaderboard = await node.get(`https://www.haloapi.com/stats/h5/player-leaderboards/csr/${metaData.id}/${playlist.id}?=`, ["ocp-apim-subscription-key", process.env.API_KEY])
//             .then((data: any) => {
//                 data = JSON.parse(data)
//                 CurrentLeaderboard.push({
//                     name: playlist.name,
//                     details: data
//                 });
                
//                 node.writeToFile("./cache", "LeaderBoard", "json", JSON.stringify(CurrentLeaderboard));
//                 // node.writeToFile("./cache", playlist.name, "json", JSON.stringify({
//                 //     name: playlist.name,
//                 //     details: data
//                 // }));
    
//             })
//           }, i * 3600);
//     });



//     return new Promise((resolve, reject) => {
//         resolve(CurrentLeaderboard) 
//     })
//     return;
// }

export function championstart(metaData: any){
    
    let CurrentLeaderboard:any = [];

    metaData.playlists.forEach((playlist: any, i: number) => {
        setTimeout(() => {
            addPlaylist(playlist, metaData).then((playlistInfo: any) => {
                CurrentLeaderboard.push({
                    name: playlist.name,
                    details: JSON.parse(playlistInfo)
                });
            });
            node.writeToFile("./cache", "LeaderBoard", "json", JSON.stringify(CurrentLeaderboard));
        }, i * 1000);
    });
}

async function addPlaylist(playlist: any, metaData: any){
    let response: any;
 
    try {
        response = await node.get(`https://www.haloapi.com/stats/h5/player-leaderboards/csr/${metaData.id}/${playlist.id}?=`, ["ocp-apim-subscription-key", process.env.API_KEY])
    } catch (error) {
        
    }
    finally {
       return response;
    }
}
// function getPlayer(gamertag){
    
//     this.haloApi.getPlayer(gamertag).subscribe((res : res)=>{
//       this.player = res.Results[0];
//       this.playerPlaylist = res.Results[0].Result.ArenaStats.ArenaPlaylistStats;
//       this.getPlaylists();
//     });
//   }

//   function getPlaylists(){
//     this.haloApi.getPlaylists().subscribe((res : res)=>{
//       this.playlistList = res;
//       this.getCsr();
//     });
//   }

//   function getCsr(){
//     this.haloApi.getCsr().subscribe((res : res)=>{
//       this.csrDesignation = res;
//       this.getPlaylistName();
//     });
//   }

//   function start(){
//     let gamertag = this.route.snapshot.params['id'];
//     this.getPlayer(gamertag);
//   }

//   functiongetPlaylistName(){
//     this.haloApi.getPlaylistName(this.playerPlaylist, this.playlistList, this.csrDesignation, this.playlistNames);
//   }