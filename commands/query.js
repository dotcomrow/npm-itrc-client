const conWrapper = require('../utilities/ConnectionWrapper')

function query (args) {

    urlOptions= {
        'method': 'POST',
        'hostname': 'websec.cable.comcast.com',
        'path': '/as/token.oauth2?grant_type=client_credentials&client_id=' + args.user + '&client_secret=' + args.password + '&scope=itrc:user',
        'maxRedirects': 20
    }

    conWrapper(urlOptions, nil, (req, res, body) => {
        access_token=body.access_token;
        console.log("Access Token to itrc -> " + access_token)
    });

}

module.exports = query