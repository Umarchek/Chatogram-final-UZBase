const moment = require('moment')

formotMessage = (username, text) => {
    const time = moment().format('h:mm:ss')
    return {
        time,
        username,
        text
    }
}

module.exports = formotMessage