const removeAll = (string, toRemove) => string.split(toRemove).join('')

const removeChars = (string, chars) => chars.reduce((newString, currentChar) => (removeAll(newString, currentChar)), string)

const reverseAtChar = (string, char) => string.split(char).reverse().join('')

module.exports = { removeAll, removeChars, reverseAtChar }
