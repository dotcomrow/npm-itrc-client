const getConnection = require('../utilities/connection')
const connection = require('../utilities/connection')

function query (api, user, password, query) {
    console.log(api)
    console.log(user)
    console.log(password)
    console.log(query)
    getConnection(user, (token) => {
        console.log(token)
    });
}

module.exports = query