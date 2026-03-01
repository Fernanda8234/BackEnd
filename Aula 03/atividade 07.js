/********************************************************************
 * Objetivo: Criar um sistema que gerencie números pares e ímpares
 * Data: 28/02/2026
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

entradaDeDados.question(`Digite o primeiro número: `, function(n1){
    entradaDeDados.question(`Digite o segundo número: `, function(n2){
        console.log("\nO que deseja calcular?")
        console.log("(a) - Somente Pares")
        console.log("(b) - Somente Ímpares")
        console.log("(ambos) - Ver os dois")
            entradaDeDados.question('Escolha uma opção: ', function(opcao) {

            let escolha = opcao.toLowerCase()

            // chamamos a validação direta. 
            // ela limpa os dados e, se estiverem ok, ela mesma executa o cálculo.
            calculos.imparOuParValidacao(n1, n2, escolha)

            entradaDeDados.close()
        })
    })
})
