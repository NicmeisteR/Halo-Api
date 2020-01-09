// ██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗███████╗
// ██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
// ██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   ███████╗
// ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
// ██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   ███████║
// ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
// Imports
const node = require('node-essentials');
import { Player, ArenaPlaylistStats } from '../models/player';
import { Query } from '../models/query';
import { Playlists } from '../models/playlists';
import { arena, ranks } from '../functions/haloapi';

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
        player = await node.get(query.url, ["ocp-apim-subscription-key", token]).then(console.log("Retrieved: Player"));

    } catch (error) {
        console.log(error);
    }
    finally {
        if(query.query === "playlists"){
            return new Promise<Playlists>((resolve, reject) => {
                player = JSON.parse(player);
                return resolve(player);
            });
        }
        else if(query.query === "csr"){
            return new Promise<Playlists>((resolve, reject) => {
                player = JSON.parse(player);
                return resolve(player);
            });
        }
        else if(query.query === "arena"){
            return new Promise<Player>((resolve, reject) => {
                player = JSON.parse(player);
                return resolve(player);
            });
        }
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

    return new Promise<Query>(resolve => {
        return resolve({
            "url": url,
            "query": query,
            "function": arena
        });
    });
}

export async function getPlaylistName(playerPlaylist: Array<ArenaPlaylistStats> | undefined, playlistList: Array<Playlists>, csrDesignation: any) {

    if(playerPlaylist === undefined){
        return new Promise( resolve => {
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

    return new Promise( resolve => {
        resolve(playlistNames);
    });
}

function parseTime(time: any){
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