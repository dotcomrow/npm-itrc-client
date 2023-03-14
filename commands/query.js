const conWrapper = require('../utilities/ConnectionWrapper')

function query (args) {

    urlOptions= {
        'method': 'POST',
        'hostname': 'websec.cable.comcast.com',
        'path': '/as/token.oauth2?grant_type=client_credentials&client_id=' + args.user + '&client_secret=' + args.password + '&scope=itrc:user',
        'maxRedirects': 20
    }

    conWrapper(urlOptions, null).then((result) => {
        token=JSON.parse(result.body).access_token
         // Token is api token for ITRC test

         itrcOptions= {
            'method': 'GET',
            'hostname': args.api,
            'path': args.query,
            headers : {
                'Authorization': ('Bearer ' + token)
            }
        }
         console.log(itrcOptions)
        conWrapper(itrcOptions, null).then((result) => {
            console.log(result.body)
        });
    });

}

module.exports = query