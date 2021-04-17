const fs = require('fs')

const createDirIfNotExistsSync = directory => (!fs.existsSync(directory) ? fs.mkdirSync(directory) : null)
