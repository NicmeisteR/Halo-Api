var request = require("request");
require('dotenv').config()

var options = {
    method: 'POST',
    url: 'https://haloapi.nicmeister.cloud/',
    headers: {
        'content-type': 'application/json'
    },
    body: { gamertag: 'Final Necessity', token: process.env.API_KEY },
    json: true
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});
