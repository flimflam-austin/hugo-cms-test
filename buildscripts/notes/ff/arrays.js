const getUniqueValues = array => [...new Set(array)]

const all = (array, fn) => array.every(fn)

const allEqual = array => all(array, val => val === array[0])

const forceToArray = value => (Array.isArray(value) ? value : [value])

const removeFalsyValues = array => array.filter(Boolean)

const countOccurances = (array, value) => array.reduce((acc, item) => (item === value ? acc + 1 : acc), 0)

const flattenRecursively = array =>
    [].concat(
        ...array.map(value => (Array.isArray(value) ? flattenRecursively(value) : value))
    )

const flattenToDepth = (array, depth = 1) =>
    array.reduce((acc, item) =>
        acc.concat(
            (
                depth > 1 && Array.isArray(item)
                    ? flattenToDepth(item, depth - 1)
                    : item)
        ), []
    );

const difference = (arrayA, arrayB) => {
    const s = new Set(arrayB)

    return arrayA.filter(item => !s.has(item))
}

const differenceBy = (arrayA, arrayB, fn) => {
    const s = new Set(arrayB)

    return arrayA.filter(item => !s.has(fn(item)))
}

const intersection = (arrayA, arrayB) => {
    const s = new Set(arrayB);

    return arrayA.filter(item => s.has(item));
};

const intersectionBy = (arrayA, arrayB, fn) => {
    const s = new Set(arrayB.map(fn));

    return arrayA.filter(item => s.has(fn(item)));
};

const findLastBy = (array, fn) => array.filter(fn).pop()

const forEachFromRight = (array, fn) =>
    array
        .slice(0)
        .reverse()
        .forEach(fn)

// get first item
const head = arr => arr[0];

// length > 1, returns everything after first item. length === 0, returns only item
const tail = arr => (arr.length > 1 ? arr.slice(1) : arr);

// Returns all indexes of a value in an array
const indexOfAll = (array, value) => array.reduce((acc, item, index) => (item === value ? [...acc, index] : acc), [])

// Returns all items except the last
const allButLast = array => array.slice(0, -1)

// Returns the n largest values from array
const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n)

// returns n smallest values from array
const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n)

const randomIntegerInRange = (minInt, maxInt) => Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;

const generateRandomIntArrayInRange = (minInt, maxInt, arrayLength = 1) =>
    Array.from({ length: arrayLength }, () => randomIntegerInRange(minInt, maxInt));

// returns random value from array
const sample = array => array[randomIntegerInRange(0, array.length)]

// TODO: refactor mutability
// returns n random values from array up to length of array
const sampleSize = ([...array], n = 1) => {
    let m = array.length;

    while (m) {
        const i = Math.floor(Math.random() * m--);

        [array[m], array[i]] = [array[i], array[m]];
    }
    return array.slice(0, n);
};

// TODO: refactor mutability
// returns array shuffled
const shuffle = ([...arr]) => {
    let m = arr.length;

    while (m) {
        const i = Math.floor(Math.random() * m--);

        [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
};


const sumAll = (...array) => [...array].reduce((acc, value) => acc + value, 0);

const merge = (arrayA, arrayB) => [...arrayA, ...arrayB]

// returns only the unique values from combining an array
// const union = (arrayA, arrayB) => Array.from(new Set([...arrayA, ...arrayB]))
const union = (arrayA, arrayB) => getUniqueValues(merge(arrayA, arrayB))

module.exports = {
    getUniqueValues
}
