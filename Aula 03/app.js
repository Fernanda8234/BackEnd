/********************************************************************
 * Objetivo: Calcular juros compostos de produtos
 * Data: 01/03/2026
 * Autor: Fernanda
 * Versão: 1.0
 *******************************************************************/

// bibliotecas
const readline  = require('readline')
const entradas  = require('./modulo/entradas.js')

// entrada de dados
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// menu principal
console.log('------------------------------------------')
console.log('       SISTEMA MULTIFUNCIONAL v1.0       ')
console.log('------------------------------------------')
console.log('1 - Calculadora de IMC')
console.log('2 - Calculadora de notas escolares')
console.log('3 - Gerador de Tabuada')
console.log('4 - Gerador de Fatorial')
console.log('5 - Analisador de Ímpar ou Par')
console.log('0 - Sair')

entradaDeDados.question('\nEscolha uma opção: ', function(opcao) {
    switch (opcao) {
        case '1': // if
            entradas.iniciarIMC(entradaDeDados)
                break
                                        
                case '2': // else if
                    entradas.iniciarSistemaNotas(entradaDeDados)
                        break
                        
                        case '3': // else if
                            entradas.iniciarTabuada(entradaDeDados)
                                break
                        
                                case '4': // else if
                                    entradas.iniciarFatorial(entradaDeDados)
                                        break

                                        case '5': // else if
                                            entradas.iniciarImparOuPar(entradaDeDados)
                                                break

                                                case '0': // else if
                                                    entradaDeDados.close()
                                                        break
                    } // switch
})
