const getConnection = require('../utilities/connection')
const connection = require('../utilities/connection')

function query (api, user, password, query) {
    getConnection(user, password)
}

module.exports = query