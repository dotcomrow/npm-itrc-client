const req = import('../utilities/ConnectionWrapper')

function getConnection (args) {
    new Promise((resolve, reject) => {
        var options = {
            'method': 'POST',
            'hostname': 'websec.cable.comcast.com',
            'path': '/as/token.oauth2?grant_type=client_credentials&client_id=' + args.user + '&client_secret=' + args.password + '&scope=itrc:user',
            'maxRedirects': 20
        }

        const handleRequest = (options, {}) => {
            const req = https.request(urlOptions);
            resolve(body.access_token)
        };
    });
}

module.exports = getConnection