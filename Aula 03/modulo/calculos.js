/**************************************************************************
 * Objetivo: Correção de erros com 0
 * Data: 13/02/2026
 * Autor: Fernanda
 * Versão: 1.2
 *************************************************************************/

/* 
criando uma função para calcular o valor da compra parcelado
método tradicional de criar uma função 
*/

function calcularJurosCompostos(valorCompra, taxaJuros, tempoPagto){
    /* 
    recebe os argumentos de função em variáveis locais
    as variávis (valor, taxa e tempo são numéricas por conta da conversão)
    mas os argumentos (valorCompra, taxaJuros, tempoPagto ainda será Strings) 
    */
    let valor = Number(valorCompra)
    let taxa  = Number(taxaJuros)
    let tempo = Number(tempoPagto)

    // validação de entradas vazias ou de caracteres inválidos
    if(valorCompra == '' || isNaN(valorCompra) || tempoPagto == '' || isNaN(tempoPagto)){
        console.log('Erro: Os valores de compra ou tempo de pagamento estão incorretos')
        return false
    }else {

        // chama a função para converter o número em percentual
        let percentual = calcularPercentual(taxa)

            // validação para o erro do percentual na função calcularPercentual()
            if(percentual){
                let montante = valor * (( 1 + percentual) ** tempo)
                return Number(montante.toFixed(2))
            }else {
                console.log('Erro: O valor da taxa está incorreto')
                return false
        } // 2 else
    } // 1 else
} // função

// calcula o percentual do número
function calcularPercentual(numero){
    let numeroPercentual = Number(numero)

    // validação para verificar se é um número válido 
    if(numero == '' || numero <= 0 || isNaN(numero)){
        return false // não pode processar
    } else {
        // processamento do calculo do percentual
        let percentual = numeroPercentual / 100
        return Number(percentual.toFixed(2))
    }
}

// calcula a soma dos números
function calcularSoma(soma1, soma2){
    let n1 = Number(soma1.replace(',', '.'))
    let n2 = Number(soma2.replace(',', '.'))

    // validação de entradas vazias ou de letras
    if(soma1.trim() == '' || isNaN(n1) || soma2.trim() == '' || isNaN(n2)){
        console.log('Erro: Digite um número válido')
        return false
    }else {
        // processamento do calculo
        let calculo = n1 + n2
        return Number(calculo.toFixed(2))
    }
}

// calcula a subtração dos números
function calcularSubtracao(subtracao1, subtracao2){
    let n1 = Number(subtracao1.replace(',', '.'))
    let n2 = Number(subtracao2.replace(',', '.'))

    // validação de entradas vazias ou de letras
    if(subtracao1.trim() == '' || isNaN(n1) || subtracao2.trim() == '' || isNaN(n2)){
        console.log('Erro: Digite um número válido')
        return false
    }else {
        // processamento do calculo
        let calculo = n1 - n2
        return Number(calculo.toFixed(2))
    }
}

// calcula a multiplicação dos números
function calcularMultiplicacao(multiplicacao1, multiplicacao2){
    let n1 = Number(multiplicacao1.replace(',', '.'))
    let n2 = Number(multiplicacao2.replace(',', '.'))

    // validação de entradas vazias ou de letras
    if(multiplicacao1.trim() == '' || isNaN(n1) || multiplicacao2.trim() == '' || isNaN(n2)){
        console.log('Erro: Digite um número válido')
        return false
    }else {
        // processamento do calculo
        let calculo = n1 * n2
        return Number(calculo.toFixed(2))
    }
}

// calcula a divisão dos números
function calcularDivisao(divisao1, divisao2){
    let n1 = Number(divisao1.replace(',', '.'))
    let n2 = Number(divisao2.replace(',', '.'))

    // validação de entradas vazias ou de letras
    if(n1 == '' || isNaN(n1) || n2 == '' || isNaN(n2)){
        console.log('Erro: Digite um número válido')
        return false
    }
    else {
        // processamento do calculo
        let calculo = n1 / n2
        return Number(calculo.toFixed(2))
    }
}

// tornando as duas funções públicas para este projeto
module.exports = {
    calcularJurosCompostos,
    calcularPercentual,
    calcularSoma,
    calcularSubtracao,
    calcularMultiplicacao,
    calcularDivisao
}