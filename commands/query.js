const getConnection = require('../utilities/connection')

function query (args) {
    getConnection(args, (token) => {
        console.log(token)
    });
}

module.exports = query