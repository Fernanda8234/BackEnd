/**************************************************************************************************
 * Objetivo: Arquivo responsável por gerar a tabuada de um número
 * Data: 25/02/2026
 * Autor: Fernanda
 * Versão: 1.0
 *************************************************************************************************/

const calculos = require('./calculos.js')

// função para imprimir a tabuada usando While/Enquanto
const tabuada = function(tabuada){

    // recebe a tabuada a ser gerada
    let tab = Number(tabuada)

    let cont = 1
    let resultado

    // repetição para gerar a tabuada até 10
    while (cont <= 50) {

        // chama a função e multiplicar para realiar a operação
        resultado = calculos.calcularMultiplicacao(tab, cont)
        //  console.log(tab + 'x' + cont + '=' + resultado)
        console.log(`${tab} x ${cont} = ${resultado}`)
        cont ++
    }
}

tabuada(20)