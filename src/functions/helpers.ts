// ██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗███████╗
// ██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
// ██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   ███████╗
// ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
// ██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   ███████║
// ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
// Imports
const node = require('node-essentials');
const fs = require('fs');
import { championstart } from '../functions/haloapi';
import { Player, ArenaPlaylistStats } from '../models/player';
import { Query } from '../models/query';
import { Playlists } from '../models/playlists';
import { arena, ranks, xp } from '../functions/haloapi';

// ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
// ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
// █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
// ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
// ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
// ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
// Functions
export async function get(token: string, query: Query) {
    let player: any;
    try {
        player = await node.get(query.url, ["ocp-apim-subscription-key", token]).then(console.log(`Retrieved: ${query.query}`));

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

export async function selector(query: string, gamertag: string) {
    const url = `https://www.haloapi.com/stats/h5/servicerecords/arena?players=${gamertag}`;

    if (query.toLowerCase() === "arena") {
        return new Promise<Query>(resolve => {
            return resolve({
                "url": url,
                "query": query,
                "function": arena
            });
        });
    }
    else if (query.toLowerCase() === "ranks") {
        return new Promise<Query>(resolve => {
            return resolve({
                "url": url,
                "query": query,
                "function": ranks
            });
        });
    }
    else if (query.toLowerCase() === "xp") {
        return new Promise<Query>(resolve => {
            return resolve({
                "url": url,
                "query": query,
                "function": xp
            });
        });
    }

    return new Promise<Query>(resolve => {
        return resolve({
            "url": url,
            "query": query,
            "function": arena
        });
    });
}

export async function getPlaylistName(playerPlaylist: Array<ArenaPlaylistStats> | undefined, playlistList: Array<Playlists>, csrDesignation: any) {

    if (playerPlaylist === undefined) {
        return new Promise(resolve => {
            resolve("Not Placement Matches Played");
        });
    }

    let playlistNames: any = [];

    playerPlaylist.forEach((playlist: ArenaPlaylistStats) => {
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
                    }
                }
                else {
                    _DesignationId = 0;
                    _Designation = {
                        name: csrDesignation[_DesignationId].name,
                        bannerImageUrl: csrDesignation[_DesignationId].bannerImageUrl,
                        iconImageUrl: csrDesignation[_DesignationId].tiers[10 - _MeasurementMatchesLeft].iconImageUrl
                    }
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
                }
                playlistNames.push(details);
            }
        });
    });

    return new Promise(resolve => {
        resolve(playlistNames);
    });
}

function parseTime(time: any) {
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

export function numberFormat(x: any) {
    if(x === undefined){
        return 0;
    }
    else{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
}

export function numDecFormat(x: any) {
    let reformat = x.toFixed(0);
    let parts = reformat.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}

export async function weeklySchedule(){
    let metaData: any;
    try {
        metaData = await node.get("https://www.haloapi.com/metadata/h5/metadata/seasons", ["ocp-apim-subscription-key", process.env.API_KEY]).then(console.log(`Retrieved: Meta Data`));

    } catch (error) {
        console.log(error);
    }
    finally {
        return new Promise<any>((resolve, reject) => {

            let currentPlaylists: any = null;
    
            metaData = JSON.parse(metaData);
            metaData.filter((item: any) => {
                if(item.isActive === true){
                    let activePlaylists: any = [];
                    item.playlists.forEach((playlist: any) => {
                        if(playlist.isActive){
                            activePlaylists.push({
                                name : playlist.name,
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
}

export async function weeklyScheduleLeaderboard(metaData: any){

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
        fs.readFile(`./cache/LeaderBoard.json`, 'utf8', (err: any, data: any) => {
            console.log("data", data);
            
            let playlists:any = [];
            
            // data = JSON.parse(data.slice(0, -1) + ''); TODO: This is here because I left it here so deal with it. Jokes aside it was for formatting leaving for a while.
            data = JSON.parse(data);
            
            data.forEach((item: any) => {
                playlists.push({
                    Playlist: item.name,
                    CSR: item.details.Results[item.details.ResultCount - 1].Score.Csr,
                    Rank: item.details.Results[item.details.ResultCount - 1].Rank
                });
                node.writeToFile("./cache", "leaderboardData", "json", JSON.stringify(playlists));
            });
        });
    }
}