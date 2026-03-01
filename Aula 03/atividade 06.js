/********************************************************************
 * Objetivo: Calcular o Fatorial de um número fornecido pelo usuário
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

entradaDeDados.question(`Digite o número: `, function(numero){

        let f = calculos.validacao(numero)
        if(f === false){
            entradaDeDados.close()
            return
        }
    
        calculos.fatorial(f[0])
        
        entradaDeDados.close()
})