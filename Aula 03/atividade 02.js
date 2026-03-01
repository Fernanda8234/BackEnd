/********************************************************************
 * Objetivo: Melhorias no código
 * Data: 28/02/2026
 * Autor: Fernanda
 * Versão: 1.1
 *******************************************************************/

// biblioteca
const readline = require('readline')
const calculos = require('./modulo/calculos.js')
const menu = 'Escolha uma opção \nsoma \nsubtração \nmultiplicação \ndivisão \nOpção: '

// entrada de dados
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

entradaDeDados.question('Digite o primeiro número: ', function(numero1){
    entradaDeDados.question('Digite o segundo número: ', function(numero2){
        entradaDeDados.question(menu, function escolhaPergunta(escolha){
            if(escolha == '' || escolha == null){
                console.log('Erro: é obrigatório o escolher uma das opções!')
                return entradaDeDados.question(menu, escolhaPergunta)
                } else if (escolha !== 'soma' && escolha !== 'subtração' && escolha !== 'multiplicação' && escolha !== 'divisão') {
                    console.log('Erro: Opção inválida! Escolha soma, subtração, multiplicação ou divisão.')
                    return entradaDeDados.question(menu, escolhaPergunta)
                    }

                    let n1 = Number(String(numero1).replace(',', '.'))
                    let n2 = Number(String(numero2).replace(',', '.'))
                    let resultado = calculos.validacaoOperacoesBasicas(n1, n2, escolha)

                    switch (escolha) {
                            case 'soma': // if
                                resultado = calculos.soma(n1, n2)
                                    break
                                    
                                    case 'subtração': // else if
                                        resultado = calculos.subtracao(n1, n2)
                                            break
                    
                                            case 'multiplicação': // else if
                                                resultado = calculos.multiplicacao(n1, n2)
                                                    break
                    
                                                    case 'divisão': // else if
                                                        resultado = calculos.divisao(n1, n2)
                                                            break
                } // switch
           
            if (resultado ==! NaN) {
                console.log(`O resultado da operação é: ${resultado}`)
            }

            // mata o processo do readline e volta para o prompt do sistema (PS C:\...>)
            entradaDeDados.close()
        }) // opções
    }) // segundo número
}) // primeiro número