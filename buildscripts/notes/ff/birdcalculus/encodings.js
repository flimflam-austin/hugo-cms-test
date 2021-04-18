/*
Church Encodings
*/
const bird = require('./birds')


// True
// Kestrel
// T := K := λxy.x
// TRUE = then => else => then
const T = thn => els => thn

// False
// Kite
// F := KI := λxy.y
// FALSE = then => else => else
const F = thn => els => els

// Flip
// Cardinal
// FLIP := λfab.fba := C
const flip = func => a => b => func(b)(a)

// Not
// NOT := λb.bFT := C F
const not = chooseOne => chooseOne(F)(T)

// And
// AND := λpq.pqF := λpq.pqp
const and = p => q => p(q)(p)

// Or
// OR := λpq.pTq := λpq.ppq
const or = p => q => p(p)(q)

// Boolean Equality
// BEQ := λpq.p (qTF) (qFT)
const beq = p => q => p(q(T)(F))(q(F)(T))

// Numerals
// 0 := λfx.x
// 1 := λfx.fx
// 2 := λfx.ffx
const zero = f => x => x
const one = f => x => f(x)
const two = f => x => f(f(x))

const yell = str => `${str}!` // two(yell)('hello') >> hello!!

// Successor aka Succ
// does n + 1 applications of f to x
// SUCCESSOR := λnfx.f(nfx)
const succ = num => f => x => f(num(f)(x))

const newOnce = succ(zero)
const newTwice = succ(succ(zero))
const newThrice = succ(newTwice)

const yellOnce = newOnce(yell)('hello') // hello!
const yellTwice = newTwice(yell)('hello') // hello!!
const yellThrice = newThrice(yell)('hello') // hello!!!

// Compose
// Bluebird
// B := λfgx.f(gx) := (∘) := Compose
const compose = f => g => x => f(g(x))

const n0 = zero
const n1 = succ(n0)
const n2 = succ(succ(n0))
const n3 = succ(n2) // n3(yell)('hello') >> hello!!!

// Addition
// ADD 3 2 = 3 SUCC 2 aka 'thrice successor of twice
// ADD := λab.a(succ)b
const add = numA => numB => numA(succ)(numB)

const n5 = add(n2)(n3) // add(n5)(n2)(yell)('hello') >> hello!!!!!!!

const church = n => (n === 0 ? n0 : succ(church(n - 1))) // jsnum -> church
const jsnum = c => c(x => x + 1)(0) // church -> jsnum

// Multiplication
// MULT 3 2 = 3 ∘ 2 aka 'thrice of twice'
// MULT := λab.a∘b := COMPOSE
const mult = compose // jsnum( MULT(n1)(n5) ) >> 5

// Exponentiation
// Thrush
// POW := λab.ba aka 'mult two by itself three times'
const POW = numA => numB => numB(numA) // jsnum( POW(n2)(n3) ) >> 8
