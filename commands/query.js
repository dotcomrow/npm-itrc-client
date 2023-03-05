const getConnection = require('../utilities/connection')
const connection = require('../utilities/connection')

function query (api, user, password, query) {
    connection.getConnection(user, password)
}

module.exports = query