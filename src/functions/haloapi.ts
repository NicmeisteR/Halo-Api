// ██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗███████╗
// ██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
// ██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   ███████╗
// ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
// ██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   ███████║
// ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
// Imports
import { Player } from '../models/player';
import { get, getPlaylistName } from '../functions/helpers';
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