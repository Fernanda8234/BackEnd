/**************************************************************************
 * Objetivo: Arquivo responsável pela entrada e saída de dados da aplicação
 * Data: 20/02/2026
 * Autor: Fernanda
 * Versão: 1.0
 *************************************************************************/

const calculosMatematicos = require(`./modulo/calcular.js`)

let resposta = calculosMatematicos.calcular(10, 60, 'somar')
let respostaSoma = calculosMatematicos.somar(10, 60)

console.log(resposta)