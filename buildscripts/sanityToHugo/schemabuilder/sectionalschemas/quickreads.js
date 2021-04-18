const sh = require('./../schemahelpers')
const ff = require('./../../ffhelpers')
const inspect = require('./../../inspect')
const cardTextToMarkdown = require('./../cardTextToMarkdown')

const hasValue = value => typeof value !== null || typeof value !== undefined;

const cardsUseCustomCheckmarkOption = cards => cards.reduce((acc, card) => (hasValue(card.showCheckmark) || acc === true), false)

const addUseCheckmark = (card, shouldUse) => Object.freeze({ ...card, useCheckmark: shouldUse })

const addCustomCheckmarkAssignment = card => addUseCheckmark(card, card.showCheckmark)

const isLastCard = (card, index, cardsArray) => index === cardsArray.length - 1

const addDefaultCheckmarkAssignment = (card, index, cardsArray) => addUseCheckmark(card, isLastCard(card, index, cardsArray))

const addCheckmarkAssignmentToCards = cards => (
    cardsUseCustomCheckmarkOption(cards)
        ? cards.map(addCustomCheckmarkAssignment)
        : cards.map(addDefaultCheckmarkAssignment)
)

const validateCards = card => ff.isValue(card)

const translateCardBody = card => (
    card.body
        ? cardTextToMarkdown(card.body)
        : null
)

const buildCardData = (card, index) => {
    try {
        const translatedBody = translateCardBody(card)

        return Object.freeze({
            order: index,
            useCheckmark: card.useCheckmark,
            ...(translatedBody && { body: translatedBody }),
            ...(card.citation && { citation: card.citation }),
            ...(card._key && { _key: card._key })
        })
    } catch (err) {
        throw err
    }

}

const buildCards = cards => {
    const validatedInitialCardData = cards.filter(validateCards)

    const cardsWithCheckmarkAssignment = addCheckmarkAssignmentToCards(validatedInitialCardData)

    const builtCards = cardsWithCheckmarkAssignment
        .map(buildCardData)
        .filter(validateCards)

    const validatedBuiltCards = builtCards.filter(validateCards)

    return validatedBuiltCards
}
const getCards = cards => {
    try {
        if (ff.notArray(cards)) {
            throw Error(`No cards found in value: '${cards}'.`)
        }

        const builtCards = buildCards(cards)

        return builtCards
    } catch (err) {
        inspect.errorRed(Error(`Failed to build cards at getCards in schemaBuilder.js. Error:\n\t${err}`))
        return null
    }
}

const getQuickReadsFields = data => {
    const quickReadsFields = [
        sh.getFlatPair(
            'card_series',
            data.series ? data.series.title : 'SmartHER News'
        ),
        sh.getFlatPair('colorpaletteclassname', data.colorpaletteclassname),
        sh.getFlatPair('cards', data.cards, null, getCards)
    ]

    return ff.compileValidArrayValues(quickReadsFields)
}

module.exports = getQuickReadsFields
