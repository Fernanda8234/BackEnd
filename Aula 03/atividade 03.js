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

entradaDeDados.question(`Digite o seu peso: `, function(peso){
    entradaDeDados.question(`Escolha uma opção \n(1) Em cm \n(2) Em metros \nOpção: `, function perguntaOpcao(opcao){ 
        if (opcao !== '1' && opcao !== '2') {
            console.log('Erro: Opção inválida!')
            return perguntaOpcao()
        }

        entradaDeDados.question(`Digite a sua altura: `, function(altura) {
            // valida os dados uma única vez
            let m = calculos.validacao(peso, altura)
            if (!m) return entradaDeDados.close()

            // define a altura final (se for opção 2, converte; se não, usa direto)
            let metros = (opcao === "2") ? calculos.metrosParaCm(m[1]) : m[1]

            // calcula e mostra o resultado (sem repetir código!)
            let valorImc = calculos.imc(m[0], metros)
            let faixa = calculos.imcPeso(valorImc)

            console.log(`\nSeu IMC é: ${valorImc}\nVocê está na faixa de: ${faixa}`)
            entradaDeDados.close()
        })
    })
})