const getKeys = obj => Object.keys(obj)

const findKeyBy = (obj, fn) => getKeys(obj).find(key => fn(obj[key], key, obj))

const forEachProperty = (obj, fn) => getKeys(obj).forEach(key => fn(obj[key], key, obj))
