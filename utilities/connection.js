const reqt = require ('./ConnectionWrapper')
const {https} = require( "https");

function req  (urlOptions, body) {
  new Promise((resolve, reject) => {
        const handleRequest = (urlOptions, {}) => {
            const reqt = https.request(urlOptions);
            resolve(body.access_token)
        };


    const req2 = https.request(urlOptions);
    req2.once("response", handleRequest);

    if (body) {
      req2.end(body);
    } else {
      req2.end();
    }
  });
}

module.exports = req