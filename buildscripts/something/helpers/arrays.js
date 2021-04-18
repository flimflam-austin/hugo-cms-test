const merge = (arrayA, arrayB) => [].concat(arrayA, arrayB)

const addToHead = (array, value) => [].concat(value, array)

module.exports = { merge, addToHead }
