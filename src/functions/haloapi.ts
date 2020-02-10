// ██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗███████╗
// ██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
// ██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   ███████╗
// ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
// ██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   ███████║
// ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
// Imports
import { Player } from '../models/player';
import { get, getPlaylistName, numberFormat, numDecFormat } from '../functions/helpers';
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

    let query = {
        playlists: {
            "url": `https://www.haloapi.com/metadata/h5/metadata/playlists`,
            "query": "playlists",
            "function": null
        },
        csr: {
            "url": `https://www.haloapi.com/metadata/h5/metadata/csr-designations`,
            "query": "csr",
            "function": null
        }
    };

    let playerPlaylist = player.Results[0].Result.ArenaStats.ArenaPlaylistStats;
    let playlistList = await get(token, query.playlists);
    let csrDesignation = await get(token, query.csr);

    let playlistName = await getPlaylistName(playerPlaylist, playlistList, csrDesignation) 

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
        resolve(playlistName);
    });
}

export async function getXpBreakdown(player: any){
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
    const dateDone = new Date("11/15/2020"); 

    // To calculate the time difference of two dates 
    let Difference_In_Time = dateDone.getTime() - dateNow.getTime(); 
    
    // To calculate the no. of days between two dates 
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
    
    // OBJECT
    let normalStats = {
        "Gamertag": player.Gamertag,
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