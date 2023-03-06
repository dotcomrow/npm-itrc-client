const https = require( "https");

function req  (urlOptions, body, rsolv) {
  new Promise((rsolv, reject) => {
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
        rsolv({ req, res, body: Buffer.concat(chunks) });
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