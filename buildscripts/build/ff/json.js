const isValidJSON = str => {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
};

const prettyPrintJson = json => JSON.stringify(json, null, '\t')
