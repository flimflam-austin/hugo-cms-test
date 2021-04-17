const pipe = (...fns) => value => fns.reduce((acc, func) => func(acc), value)

const thenify = value => Promise.resolve(value)

const forceToString = value => `${value}`

const stringToArray = str => [...str]

// returns if value is a number
const validateNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n

// Confirms if value is of a particular type
const is = (type, value) => ![, null].includes(value) && value.constructor === type;

module.exports = {
    pipe,
    thenify
}
