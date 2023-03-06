const https = require(https)

export const request = (urlOptions, body) =>
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

    const req = https.request(urlOptions);
    req.once("response", handleRequestResponse);
    req.once("error", handleRequestError);

    if (body) {
      req.end(body);
    } else {
      req.end();
    }
  });