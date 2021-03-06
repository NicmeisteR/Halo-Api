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
// ██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗███████╗
// ██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
// ██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   ███████╗
// ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
// ██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   ███████║
// ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
// Imports
const node = require('node-essentials');
const fs = require('fs');
const haloapi_1 = require("../functions/haloapi");
const haloapi_2 = require("../functions/haloapi");
// ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
// ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
// █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
// ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
// ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
// ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
// Functions
function get(token, query) {
    return __awaiter(this, void 0, void 0, function* () {
        let player;
        try {
            player = yield node.get(query.url, ["ocp-apim-subscription-key", token]).then(console.log(`Retrieved: ${query.query}`));
        }
        catch (error) {
            console.log(error);
        }
        finally {
            return new Promise((resolve, reject) => {
                player = JSON.parse(player);
                return resolve(player);
            });
        }
    });
}
exports.get = get;
function selector(query, gamertag) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://www.haloapi.com/stats/h5/servicerecords/arena?players=${gamertag}`;
        if (query.toLowerCase() === "arena") {
            return new Promise(resolve => {
                return resolve({
                    "url": url,
                    "query": query,
                    "function": haloapi_2.arena
                });
            });
        }
        else if (query.toLowerCase() === "ranks") {
            return new Promise(resolve => {
                return resolve({
                    "url": url,
                    "query": query,
                    "function": haloapi_2.ranks
                });
            });
        }
        else if (query.toLowerCase() === "xp") {
            return new Promise(resolve => {
                return resolve({
                    "url": url,
                    "query": query,
                    "function": haloapi_2.xp
                });
            });
        }
        return new Promise(resolve => {
            return resolve({
                "url": url,
                "query": query,
                "function": haloapi_2.arena
            });
        });
    });
}
exports.selector = selector;
function getPlaylistName(playerPlaylist, playlistList, csrDesignation) {
    return __awaiter(this, void 0, void 0, function* () {
        if (playerPlaylist === undefined) {
            return new Promise(resolve => {
                resolve("Not Placement Matches Played");
            });
        }
        let playlistNames = [];
        playerPlaylist.forEach((playlist) => {
            playlistList.forEach(list => {
                let id = list.id;
                if (playlist.PlaylistId === id) {
                    let _DesignationId;
                    let _Designation = {};
                    let _MeasurementMatchesLeft = playlist.MeasurementMatchesLeft;
                    if (playlist.MeasurementMatchesLeft === 0) {
                        _DesignationId = playlist.Csr.DesignationId;
                        _Designation = {
                            name: csrDesignation[_DesignationId].name,
                            bannerImageUrl: csrDesignation[_DesignationId].bannerImageUrl,
                            iconImageUrl: csrDesignation[_DesignationId].tiers[playlist.Csr.Tier - 1].iconImageUrl
                        };
                    }
                    else {
                        _DesignationId = 0;
                        _Designation = {
                            name: csrDesignation[_DesignationId].name,
                            bannerImageUrl: csrDesignation[_DesignationId].bannerImageUrl,
                            iconImageUrl: csrDesignation[_DesignationId].tiers[10 - _MeasurementMatchesLeft].iconImageUrl
                        };
                    }
                    let details = {
                        Name: list.name,
                        TotalKills: playlist.TotalKills,
                        TotalDeaths: playlist.TotalDeaths,
                        TotalTimePlayed: parseTime(playlist.TotalTimePlayed),
                        TotalGamesWon: playlist.TotalGamesWon,
                        TotalGamesLost: playlist.TotalGamesLost,
                        Csr: playlist.Csr,
                        Designation: _Designation,
                        MeasurementMatchesLeft: _MeasurementMatchesLeft
                    };
                    playlistNames.push(details);
                }
            });
        });
        return new Promise(resolve => {
            resolve(playlistNames);
        });
    });
}
exports.getPlaylistName = getPlaylistName;
function parseTime(time) {
    const DurationRegex = /(-)?P(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?(?:T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?)?/;
    let matches = time.match(DurationRegex);
    return {
        sign: matches[1] === undefined ? '+' : '-',
        years: matches[2] === undefined ? 0 : matches[2],
        months: matches[3] === undefined ? 0 : matches[3],
        weeks: matches[4] === undefined ? 0 : matches[4],
        days: matches[5] === undefined ? 0 : matches[5],
        hours: matches[6] === undefined ? 0 : matches[6],
        minutes: matches[7] === undefined ? 0 : matches[7],
        seconds: matches[8] === undefined ? 0 : matches[8]
    };
}
function numberFormat(x) {
    if (x === undefined) {
        return 0;
    }
    else {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
}
exports.numberFormat = numberFormat;
function numDecFormat(x) {
    let reformat = x.toFixed(0);
    let parts = reformat.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}
exports.numDecFormat = numDecFormat;
function weeklySchedule() {
    return __awaiter(this, void 0, void 0, function* () {
        let metaData;
        try {
            metaData = yield node.get("https://www.haloapi.com/metadata/h5/metadata/seasons", ["ocp-apim-subscription-key", process.env.API_KEY]).then(console.log(`Retrieved: Meta Data`));
        }
        catch (error) {
            console.log(error);
        }
        finally {
            return new Promise((resolve, reject) => {
                let currentPlaylists = null;
                metaData = JSON.parse(metaData);
                metaData.filter((item) => {
                    if (item.isActive === true) {
                        let activePlaylists = [];
                        item.playlists.forEach((playlist) => {
                            if (playlist.isActive) {
                                activePlaylists.push({
                                    name: playlist.name,
                                    description: playlist.description,
                                    id: playlist.id
                                });
                            }
                        });
                        currentPlaylists = {
                            name: item.name,
                            description: item.description,
                            date: {
                                startDate: item.startDate,
                                endDate: item.endDate
                            },
                            id: item.id,
                            playlists: activePlaylists
                        };
                    }
                });
                node.writeToFile("./cache", "metaData", "json", JSON.stringify(currentPlaylists));
                return resolve(currentPlaylists);
            });
        }
    });
}
exports.weeklySchedule = weeklySchedule;
function weeklyScheduleLeaderboard(metaData) {
    return __awaiter(this, void 0, void 0, function* () {
        let responseObject;
        try {
            responseObject = haloapi_1.championstart(metaData);
        }
        catch (error) {
            node.writeToFile("errors", "championstart", "txt", error);
            return "Failed on championstart";
        }
        finally {
            fs.readFile(`./cache/LeaderBoard.json`, 'utf8', (err, data) => {
                console.log("data", data);
                let playlists = [];
                // data = JSON.parse(data.slice(0, -1) + ''); TODO: This is here because I left it here so deal with it. Jokes aside it was for formatting leaving for a while.
                data = JSON.parse(data);
                data.forEach((item) => {
                    playlists.push({
                        Playlist: item.name,
                        CSR: item.details.Results[item.details.ResultCount - 1].Score.Csr,
                        Rank: item.details.Results[item.details.ResultCount - 1].Rank
                    });
                    node.writeToFile("./cache", "leaderboardData", "json", JSON.stringify(playlists));
                });
            });
        }
    });
}
exports.weeklyScheduleLeaderboard = weeklyScheduleLeaderboard;
