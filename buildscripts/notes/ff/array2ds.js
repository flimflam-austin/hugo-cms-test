const toCsv = (nestedArray, delimeter = ',') => nestedArray.map(array => array.map(item => `"${item}"`).join(delimeter)).join('\n')
