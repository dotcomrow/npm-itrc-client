const getConnection = require('../utilities/connection')

function query (args, arg2) {
    console.log(args)
    console.log(arg2)
    getConnection(args, (token) => {
        console.log(token)
    });
}

module.exports = query