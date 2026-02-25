/**************************************************************************************************
 * Objetivo: Arquivo responsável por gerar a tabuada de um número
 * Data: 25/02/2026
 * Autor: Fernanda
 * Versão: 1.0
 *************************************************************************************************/

const calculosMatematicos = require('./calcular.js')

// função para imprimir a tabuada usando While/Enquanto
const gerarTabuada = function(tabuada){

    // recebe a tabuada a ser gerada
    let tab = Number(tabuada)

    let cont = 0
    let resultado

    // repetição para gerar a tabuada até 10
    while (cont <= 10) {

        // chama a função e multiplicar para realiar a operação
        resultado = calculosMatematicos.multiplicar(tab, cont)
        //  console.log(tab + 'x' + cont + '=' + resultado)
        console.log(`${tab} x ${cont} = ${resultado}`)

    /*
        cont = cont + 1
        cont ++
        cont +=1
    */
        cont ++
    }
}

const gerarTabuadaFor = function(tabuada){

    // recebe a tabuada a ser gerada
    let tab = Number(tabuada)
    let resultado

    // repetição para gerar a tabuada até 10
    for (let cont = 0; cont <= 10; cont ++) {

        // chama a função e multiplicar para realiar a operação
        resultado = calculosMatematicos.multiplicar(tab, cont)
        console.log(`${tab} x ${cont} = ${resultado}`)
    }
}
gerarTabuada(2)
gerarTabuadaFor(3)