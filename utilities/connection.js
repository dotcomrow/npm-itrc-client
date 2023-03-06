const reqt = require ('./ConnectionWrapper')
const {https} = require( "https");

function req  (urlOptions, body) {
  new Promise((resolve, reject) => {
        var options = {
            'method': 'POST',
            'hostname': 'websec.cable.comcast.com',
            'path': '/as/token.oauth2?grant_type=client_credentials&client_id=' + args.user + '&client_secret=' + args.password + '&scope=itrc:user',
            'maxRedirects': 20
        }

        const handleRequest = (options, {}) => {
            const reqt = https.request(options);
            resolve(body.access_token)
        };


    const req = https.request(urlOptions);
    req.once("response", handleRequest);

    if (body) {
      req.end(body);
    } else {
      req.end();
    }
  });
}

module.exports = req