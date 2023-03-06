const conWrapper = require('../utilities/ConnectionWrapper')

function query (args) {

    urlOptions= {
        'method': 'POST',
        'hostname': 'websec.cable.comcast.com',
        'path': '/as/token.oauth2?grant_type=client_credentials&client_id=' + args.user + '&client_secret=' + args.password + '&scope=itrc:user',
        'maxRedirects': 20,
        logs: args.logswitch
    }

    conWrapper(urlOptions, null).then((result) => {
        token=JSON.parse(result.body).access_token
         // Token is api token for ITRC

         console.log("api endpoint -> " + args.api)
         console.log("query string -> " + args.query)
         itrcOptions= {
            'method': 'GET',
            'hostname': args.api,
            'path': args.query,
            logs: args.logswitch,
            headers : {
                'Authorization': 'Bearer ' + token
            }
        }
        
        conWrapper(itrcOptions, null).then((result) => {
            if (itrcOptions.logs == true) {console.log(result.body)}
        });
    });

}

module.exports = query