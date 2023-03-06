const https = require( "https");

function req  (urlOptions, body) {
  return new Promise(function(resolve, reject) {
    const handleRequestResponse = (res) => {
      
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
        console.log(Buffer.concat(chunks).toString())
        resolve({ req, res, body: Buffer.concat(chunks).toString() });
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
      reject(err);
    };

    const reqt = https.request(urlOptions);
    reqt.once("response", handleRequestResponse);
    reqt.once("error", handleRequestError);

    if (body) {
      reqt.end(body);
    } else {
      reqt.end();
    }
  });
}

  module.exports = req