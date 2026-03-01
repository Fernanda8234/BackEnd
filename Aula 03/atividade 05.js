/********************************************************************
 * Objetivo: Criar um sistema para gerenciar o cálculo de uma tabuada
 * Data: 25/02/2026
 * Autor: Fernanda
 * Versão: 1.0
 *******************************************************************/

// biblioteca
const readline = require('readline')
const calculo = require('./modulo/calculos.js')

// entrada de dados
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

entradaDeDados.question(`Digite a tabuada inicial:`, function(tabuInicial){
    entradaDeDados.question(`Digite a tabuada final:`, function(tabuFinal){
        entradaDeDados.question(`Digite o contador inicial:`, function(contaInicial){
            entradaDeDados.question(`Digite o contador final:`, function(contaFinal){
                calculo.tabuada(tabuInicial, tabuFinal, contaInicial, contaFinal)
                    entradaDeDados.close()
            })
        })
    })
})