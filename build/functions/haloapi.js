"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../functions/helpers");
// ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
// ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
// █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
// ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
// ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
// ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
// Functions
function arena(player) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        let root = {
            Gamertag: player.Results[0].Result.PlayerId.Gamertag,
            Xp: player.Results[0].Result.Xp,
            SpartanRank: player.Results[0].Result.SpartanRank,
            HighestCsrAttained: {
                Tier: (_a = player.Results[0].Result.ArenaStats.HighestCsrAttained) === null || _a === void 0 ? void 0 : _a.Tier,
                DesignationId: (_b = player.Results[0].Result.ArenaStats.HighestCsrAttained) === null || _b === void 0 ? void 0 : _b.DesignationId,
                Csr: (_c = player.Results[0].Result.ArenaStats.HighestCsrAttained) === null || _c === void 0 ? void 0 : _c.Csr,
                PercentToNextTier: (_d = player.Results[0].Result.ArenaStats.HighestCsrAttained) === null || _d === void 0 ? void 0 : _d.PercentToNextTier,
                Rank: (_e = player.Results[0].Result.ArenaStats.HighestCsrAttained) === null || _e === void 0 ? void 0 : _e.Rank,
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
    });
}
exports.arena = arena;
/**
 * This returns the players ranks.
 *
 * @param {Player} player
 * @param {string} token
 * @returns playlistName
 */
function ranks(player, token) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
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
        let playlistList = yield helpers_1.get(token, query.playlists);
        let csrDesignation = yield helpers_1.get(token, query.csr);
        let playlistName = yield helpers_1.getPlaylistName(playerPlaylist, playlistList, csrDesignation);
        let root = {
            Gamertag: player.Results[0].Result.PlayerId.Gamertag,
            Xp: player.Results[0].Result.Xp,
            SpartanRank: player.Results[0].Result.SpartanRank,
            HighestCsrAttained: {
                Tier: (_a = player.Results[0].Result.ArenaStats.HighestCsrAttained) === null || _a === void 0 ? void 0 : _a.Tier,
                DesignationId: (_b = player.Results[0].Result.ArenaStats.HighestCsrAttained) === null || _b === void 0 ? void 0 : _b.DesignationId,
                Csr: (_c = player.Results[0].Result.ArenaStats.HighestCsrAttained) === null || _c === void 0 ? void 0 : _c.Csr,
                PercentToNextTier: (_d = player.Results[0].Result.ArenaStats.HighestCsrAttained) === null || _d === void 0 ? void 0 : _d.PercentToNextTier,
                Rank: (_e = player.Results[0].Result.ArenaStats.HighestCsrAttained) === null || _e === void 0 ? void 0 : _e.Rank,
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
    });
}
exports.ranks = ranks;
function getXpBreakdown(player) {
    return __awaiter(this, void 0, void 0, function* () {
        //build our reply object
        let spartanRank = player.SpartanRank;
        //XP
        let xpCur = player.Xp;
        let xpCurrent = helpers_1.numberFormat(player.Xp);
        //Xp functions
        let goal = helpers_1.numberFormat(50000000);
        let percentage = ((xpCur / 50000000) * 100).toFixed(0) + "%";
        let left = helpers_1.numberFormat(50000000 - xpCur);
        let warzone = helpers_1.numDecFormat((50000000 - xpCur) / 12000);
        let arena = helpers_1.numDecFormat((50000000 - xpCur) / 1800);
        let infection = helpers_1.numDecFormat((50000000 - xpCur) / 5000);
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
                "PerDay": helpers_1.numDecFormat(((50000000 - xpCur) / Difference_In_Days)),
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
    });
}
exports.getXpBreakdown = getXpBreakdown;
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
