const getTokenConnection = require('../utilities/connection')
const https = require('https');

function query (args) {
    new Promise((resolve, reject) => {
        var options = {
            'method': 'POST',
            'hostname': 'websec.cable.comcast.com',
            'path': '/as/token.oauth2?grant_type=client_credentials&client_id=' + args.user + '&client_secret=' + args.password + '&scope=itrc:user',
            'maxRedirects': 20
        }

        const handleRequest = (options, {}) => {
            const reqt = https.request(options);
            console.log(body)
        };

        const req2 = https.request({});
        req2.once("response", handleRequest);

        if (body) {
            req2.end(body);
        } else {
            req2.end();
        }
  });
}

module.exports = query