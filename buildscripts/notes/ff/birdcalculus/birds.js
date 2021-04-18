/*
Lambda Calculus Birds
*/


// Idiot aka Ibus
// identity
// I := λx.x
const I = a => a

// Mockingbird aka ω
// self application
// M := λf.ff
const M = f => f(f)

// Kestrel
// first, constant
// K := λab.a
const K = a => b => a

// Kite
// Second
// KI := λab.b
const KI = a => b => b

// Cardinal
// not, flip
// C := λfab.fba
const C = f => a => b => f(b)(a)

// Bluebird aka B Combinator
// compose
// B := λfgx.f(gx) := (∘) := Compose
const B = f => g => x => f(g(x))

// Thrush
// Exponentiation
// T := λab.ba
const T = numA => numB => numB(numA) // jsnum( POW(n2)(n3) ) >> 8

module.exports = {
    I,
    M,
    K,
    KI,
    C,
    B,
    T
}
