const ff = require('./../../ffhelpers');

const effectiveDateField = data => Object.freeze({ effectiveDate: data.effectiveDate })

const showInFooterField = data => Object.freeze({ showInFooter: data.showInFooterField })

const fields = data => [
    effectiveDateField(data),
    showInFooterField(data)
]

const buildLegal = data => ff.compileValidArrayValues(fields(data))

module.exports = buildLegal
