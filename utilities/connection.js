const request = require('requests')

function getConnection (cli) {
    var https = require('follow-redirects').https;
    var fs = require('fs');
    console.log('connecting to -> ' + '/as/token.oauth2?grant_type=client_credentials&client_id=' + cli.username + '&client_secret=' + cli.password + '&scope=itrc:user')
    console.log(cli)
    
    var options = {
        'method': 'POST',
        'hostname': 'websec.cable.comcast.com',
        'path': '/as/token.oauth2?grant_type=client_credentials&client_id=' + cli.username + '&client_secret=' + cli.password + '&scope=itrc:user',
        'maxRedirects': 20
    };

    var req = https.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function (chunk) {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
        });

        res.on("error", function (error) {
            console.error(error);
        });
    });

    req.end();
}

module.exports = getConnection