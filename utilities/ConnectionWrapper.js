const https = require( "https");

function req  (urlOptions, body) {
  return new Promise(function(resolve, reject) {
    this.logSwitch=urlOptions.logs
    
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

    const handleRequestError = (err, urlOptions) => {
      if (this.logSwitch == true) {console.log("Error", err)}
      reject(err);
    };
    if (this.logSwitch == true) {console.log(urlOptions)}
    try {
      const reqt = https.request(urlOptions);
      reqt.once("response", handleRequestResponse);
      reqt.once("error", handleRequestError);

      if (body) {
        reqt.end(body);
      } else {
        reqt.end();
      }
    } catch (err) {
      console.log(err)
    }
  });
}

module.exports = req