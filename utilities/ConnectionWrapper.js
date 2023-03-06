const https = require( "https");

function req  (urlOptions, body) {
  return new Promise(function(resolve, reject) {
    this.logSwitch=urlOptions.logs
    console.log("logging is turned -> " + this.logSwitch)
    const handleRequestResponse = (res) => {
      
      const chunks = [];
      const handleResponseData = (chunk) => {
        chunks.push(chunk);
      };

      const handleResponseError = (err) => {
        if (this.logSwitch == true) {console.log("Error", err)}
        removeResponseListeners();
        reject(err);
      };

      const handleResponseEnd = () => {
        removeResponseListeners();
        if (this.logSwitch == true) {console.debug("Request Object", req) }
        if (this.logSwitch == true) {console.debug("Response Object", res) }
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