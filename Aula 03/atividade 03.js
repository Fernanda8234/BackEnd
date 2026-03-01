/********************************************************************
 * Objetivo: Calcular IMC
 * Data: 29/02/2026
 * Autor: Fernanda
 * Versão: 1.0
 *******************************************************************/

// bibliotecas
const readline = require('readline')
const calculos = require('./modulo/calculos.js')

// entrada de dados
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// fazer escolha entre cm e metros
entradaDeDados.question(`Digite o seu peso: `, function(peso){
    entradaDeDados.question(`Digite a sua altura em cm: `, function(altura){

        let m = calculos.validacao(peso, altura)

        if(m === false){
            entradaDeDados.close()
            return
        }
            // como 'm' é uma lista [n1, n2], passamos esses valores para o imc()
            let valorImc = calculos.imc(m[0], m[1])

            // e seguimos com a classificação
            let faixa = calculos.imcPeso(valorImc)
            console.log(`Seu IMC é: ${valorImc}\nVocê está na faixa de: ${faixa}`)
            entradaDeDados.close()
    })
})