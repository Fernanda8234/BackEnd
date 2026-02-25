/********************************************************************
 * Objetivo: Criar um sistema para operações básicas de matemática
 * Data: 13/02/2026
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

entradaDeDados.question('Digite o primeiro número: ', function(numero1){
    entradaDeDados.question('Digite o segundo número: ', function(numero2){
        entradaDeDados.question('Escolha uma opção \nSoma \nSubtração \nMultiplicação \nDivisão \nOpção: ', function escolhaPergunta(escolha){
            if(escolha == '' || escolha == null){
                console.log('Erro: é obrigatório o escolher uma das opções!')
                return entradaDeDados.question('Escolha uma opção \nSoma \nSubtração \nMultiplicação \nDivisão \nOpção:', escolhaPergunta)
                } else if (escolha !== 'Soma' && escolha !== 'Subtração' && escolha !== 'Multiplicação' && escolha !== 'Divisão') {
                    console.log('Erro: Opção inválida! Escolha Soma, Subtração, Multiplicação ou Divisão.');
                    return entradaDeDados.question('Escolha uma opção \nSoma \nSubtração \nMultiplicação \nDivisão \nOpção:', escolhaPergunta)
                    }

                    // soma
                    if (escolha === 'Soma') {
                        let m = calculos.calcularSoma(numero1, numero2);
                        if (m !== false) console.log(`Resultado: ${m.toFixed(2)}`);
                        } // soma

                            // subtração
                            if(escolha === 'Subtração'){
                                let m = calculos.calcularSubtracao(numero1, numero2);
                                if (m !== false) console.log(`Resultado: ${m.toFixed(2)}`);
                    } // subtração

                                // multiplicação
                                if(escolha === 'Multiplicação'){
                                    let m = calculos.calcularMultiplicacao(numero1, numero2);
                                    if (m !== false) console.log(`Resultado: ${m.toFixed(2)}`);
                } // multiplicação

                                    // divisão
                                    if(escolha === 'Divisão'){
                                        let m = calculos.calcularDivisao(numero1, numero2);
                                        if (m !== false) console.log(`Resultado: ${m.toFixed(2)}`);
            } // divisão
        }) // opções
    }) // segundo número
}) // primeiro número