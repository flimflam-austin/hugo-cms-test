const chalk = require('chalk')


const bland = value => {
    console.log(chalk.whiteBright(value))
    return value
}

const strong = value => {
    console.log(chalk.cyanBright(value))
    return value
}

const errorYellow = value => {
    console.error(chalk.yellowBright(value))
    return value
}

const errorRed = value => {
    console.error(chalk.redBright(value))
    return value
}

module.exports = {
    bland,
    strong,
    errorYellow,
    errorRed
}
