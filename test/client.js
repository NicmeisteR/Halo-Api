const request = require("request");
require('dotenv').config({ path: require('find-config')('.env') });

var options = {
    method: 'POST',
    url: 'http://localhost:8001',
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
