const isValue = value => !!(!!value || value === 0 || value === '0' || value === false);

const isMissingValue = value => !isValue(value);

const isArray = value => Array.isArray(value);

const notArray = value => !isArray(value);

const isFilledArray = value =>
    (!!(isArray(value) && isValue(value[0])));

const getValidArrayValues = array => array.filter(isValue);

const arrayToObject = (acc, field) => Object.freeze({ ...acc, ...field });

const compileValidArrayValues = array =>
    getValidArrayValues(array).reduce(arrayToObject, {});

const identity = x => x;

const filterUniqueValues = (value, index, self) =>
    self.indexOf(value) === index;

exports.isValue = isValue;

exports.isMissingValue = isMissingValue;

exports.isArray = isArray;

exports.notArray = notArray;

exports.isFilledArray = isFilledArray;

exports.getValidArrayValues = getValidArrayValues;

exports.arrayToObject = arrayToObject;

exports.compileValidArrayValues = compileValidArrayValues;

exports.identity = identity;

exports.filterUniqueValues = filterUniqueValues;
