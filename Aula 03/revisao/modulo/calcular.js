/**************************************************************************************************
 * Objetivo: Arquivo responsável pelas funções de calcular (somar, subtrair, multiplicar e dividir)
 * Data: 25/02/2026
 * Autor: Fernanda
 * Versão: 1.1
 *************************************************************************************************/

/* 
    toLowerCase() -> retorna a string em minusculo
    toUpperCase() -> retorna a string em MAIUSCULO
*/

/* 
    modelo de função anonima 
    calcular as 4 operações matemáticas
*/

const calcular = function (numero1, numero2, operador){

    // entrada
    let valor1 = Number(numero1)
    let valor2 = Number(numero2)
    let resultado = false
    let operadorMatematico = String(operador).toUpperCase()

/* 
    condicionais para validar qual o tipo de operação matemática
    a ausencia da { } na condicional é porque qualquer condicional que 
    tenha apenas uma linha de processamento a { } torne-se opcinal
*/

    // processamento
    
    
    /* if(operadorMatematico == 'SOMAR'){
         resultado = valor1 + valor2
         } else if(operadorMatematico == 'SUBTRAIR'){
    //         resultado = valor1 - valor2
             } else if(operadorMatematico == 'MULTIPLICAR'){
    //             resultado = valor1 * valor2
                 } else if(operadorMatematico == 'DIVIDIR'){
    //                 resultado = valor1 / valor2
                     } else{
    //                     return false
                         }
    */

    switch (operadorMatematico) {
        case 'SOMAR': // if
            resultado = somar(valor1, valor2)
                break;
                
                case 'SUBTRAIR': // else if
                    resultado = subtrair(valor1, valor2)
                        break;

                        case 'MULTIPLICAR': // else if
                            resultado = multiplicar(valor1, valor2)
                                break;

                                case 'DIVIDIR': // else if
                                    resultado = dividir(valor1, valor2)
                                        break;
                        
                                    // não é preciso se tem o false lá em cima
                                        /*
                                            default: // else
                                                break;
                                        */
    }

        // saída
        return resultado

                        /*
                        if(resultado != undefined){
                            return Number(resultado).toFixed(2)
                            } else{
                                return false
                                } */

}

// função =>

/*
    exemplo de funções baseada em SETA (arrow function)
    funções para realizar as operações matemáticas
*/
const somar = (numero1, numero2) => Number(numero1) + Number(numero2)
const subtrair = (numero1, numero2) => Number(numero1) - Number(numero2)
const multiplicar = (numero1, numero2) => Number(numero1) * Number(numero2)
const dividir = (numero1, numero2) => Number(numero1) / Number(numero2)

module.exports = {
    calcular,
    somar,
    subtrair,
    multiplicar,
    dividir
}