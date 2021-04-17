const pipe = (...functions) => x => functions.reduce((acc, func) => func(acc), x)

const tap = func => x => {
    func(x)
    return x
}

const trace = title => tap(console.log.bind(console, `${title}:` || ''))
