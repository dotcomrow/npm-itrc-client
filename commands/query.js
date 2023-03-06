const getConnection = require('../utilities/connection')

function query (args) {
    getConnection(args).then((token) => {
        console.log(token)
    });
}

module.exports = query