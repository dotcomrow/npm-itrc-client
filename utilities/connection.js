const { req } = require('./ConnectionWrapper');

function getConnection (args, doNext) {
    
    var options = {
        'method': 'POST',
        'hostname': 'websec.cable.comcast.com',
        'path': '/as/token.oauth2?grant_type=client_credentials&client_id=' + args.user + '&client_secret=' + args.password + '&scope=itrc:user',
        'maxRedirects': 20
    }

    req(options, {}).then((reqt, res, body) => {
        console.log(body)
        doNext(body.access_token)
    })

}

module.exports = getConnection