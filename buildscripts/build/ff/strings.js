const capitalizeFirstLetter = ([first, ...rest]) => first.toUpperCase() + rest.join('')

const capitalizeEveryWord = str => str.split(' ').map(capitalizeFirstLetter).join(' ')

// adds padding to string if it's shorter than minLength
const padString = (str, minLength, paddingCharacter = ' ') =>
    str.padStart((str.length + minLength) / 2, paddingCharacter).padEnd(minLength, paddingCharacter)


const reverseString = str => [...str].reverse().join('')

const sortCharactersAlphabetically = str => [...str].sort((a, b) => a.localeCompare(b)).join('')

// turns string into array of words
const toWords = (str, pattern = /[^a-zA-Z-]+/) => str.split(pattern).filter(Boolean)
