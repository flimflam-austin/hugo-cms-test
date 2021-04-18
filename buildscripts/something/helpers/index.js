const inspect = require('./inspect')
const arr = require('./arrays')
const time = require('./time')
const str = require('./str')
const jsn = require('./json')

const thenify = value => Promise.resolve(value)

const asyncMap = (array, fn) => Promise.all(array.map(fn))

const asyncMapCurry = fn => array => Promise.all(array.map(fn))

const pipe = (...functions) => x => functions.reduce((acc, fn) => fn(acc), x)

const tap = fn => x => {
    fn(x)
    return x
}

module.exports = { thenify, asyncMap, asyncMapCurry, pipe, tap, inspect, arr, time, str, jsn }
