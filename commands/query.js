const getTokenConnection = require('../utilities/connection')
const https = require('https');

function query (args) {
    new Promise((resolve, reject) => {
        const handleRequestResponse = (res) => {
          removeRequestListeners();
    
          const chunks = [];
          const handleResponseData = (chunk) => {
            chunks.push(chunk);
          };
    
          const handleResponseError = (err) => {
            removeResponseListeners();
            reject(err);
          };
    
          const handleResponseEnd = () => {
            removeResponseListeners();
            resolve({ req, res, body: Buffer.concat(chunks) });
          };
    
          const removeResponseListeners = () => {
            res.removeListener("data", handleResponseData);
            res.removeListener("error", handleResponseError);
            res.removeListener("end", handleResponseEnd);
          };
    
          res.on("data", handleResponseData);
          res.once("error", handleResponseError);
          res.once("end", handleResponseEnd);
        };
    
        const handleRequestError = (err) => {
          removeRequestListeners();
          reject(err);
        };
    
        const removeRequestListeners = () => {
          req.removeListener("response", handleRequestResponse);
          req.removeListener("error", handleRequestError);
        };
        urlOptions= {
            'method': 'POST',
            'hostname': 'websec.cable.comcast.com',
            'path': '/as/token.oauth2?grant_type=client_credentials&client_id=' + args.user + '&client_secret=' + args.password + '&scope=itrc:user',
            'maxRedirects': 20
        }
        const req = https.request(urlOptions);
        req.once("response", handleRequestResponse);
        req.once("error", handleRequestError);
        body={}
        if (body) {
          req.end(body);
        } else {
          req.end();
        }
    })
}

module.exports = query