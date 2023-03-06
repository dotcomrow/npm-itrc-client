const { request } = require('./ConnectionWrapper');

function getConnection (args, doNext) {
    
    var options = {
        'method': 'POST',
        'hostname': 'websec.cable.comcast.com',
        'path': '/as/token.oauth2?grant_type=client_credentials&client_id=' + args.opts().user + '&client_secret=' + args.opts().password + '&scope=itrc:user',
        'maxRedirects': 20
    }

    request(options, {}).then((req, res, body) => {
        console.log(body)
        doNext(body.access_token)
    })

}

module.exports = getConnection