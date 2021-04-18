const { getLastLog, getNextToLastLog } = require('./getLogs')
const { writeLog } = require('./writeLog')

// TODO: Currently has to have files and directory existing or would error
// TODO: More elegantly handle error logs. Currently ignores them.

module.exports = { writeLog, getLastLog, getNextToLastLog }
