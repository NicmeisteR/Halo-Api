const request = require("request");
require('dotenv').config({ path: require('find-config')('.env') });

//  ██████╗ ██╗   ██╗███████╗██████╗ ██╗   ██╗    ██╗     ██╗███████╗████████╗
// ██╔═══██╗██║   ██║██╔════╝██╔══██╗╚██╗ ██╔╝    ██║     ██║██╔════╝╚══██╔══╝
// ██║   ██║██║   ██║█████╗  ██████╔╝ ╚████╔╝     ██║     ██║███████╗   ██║   
// ██║▄▄ ██║██║   ██║██╔══╝  ██╔══██╗  ╚██╔╝      ██║     ██║╚════██║   ██║   
// ╚██████╔╝╚██████╔╝███████╗██║  ██║   ██║       ███████╗██║███████║   ██║   
//  ╚══▀▀═╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝   ╚═╝       ╚══════╝╚═╝╚══════╝   ╚═╝   
/*
Arena
Ranks
*/
const query = "Ranks";

var options = {
    method: 'POST',
    url: 'http://localhost:8001',
    headers: {
        'content-type': 'application/json'
    },
    body: { 
        gamertag: 'May Hamn', 
        token: process.env.API_KEY ,
        query: query
    },
    json: true
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});
