/********************************************************************
 * Objetivo: Calcular IMC
 * Data: 25/02/2026
 * Autor: Fernanda
 * Versão: 1.0
 *******************************************************************/

// biblioteca
const readline = require('readline')
const calculos = require('./modulo/calculos.js')

// entrada de dados
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

entradaDeDados.question(`Digite o seu peso: `, function(peso){
    entradaDeDados.question(`Digite a sua altura: `, function(altura){

        let m = calculos.imc(peso, altura)
        let resultado = calculos.imcPeso(m)
        
        console.log(`Seu IMC é: ${m.toFixed(2)}\nVocê está na faixa de: ${resultado}`)
    })
})