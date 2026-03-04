/**************************************************************************
 * Objetivo: Novas funções e correções
 * Data: 28/02/2026
 * Autor: Fernanda
 * Versão: 1.3
 *************************************************************************/

/* 
criando uma função para calcular o valor da compra parcelado
método tradicional de criar uma função 
*/

function jurosCompostos(valorCompra, taxaJuros, tempoPagto){
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
        let percentual = percentual(taxa)

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
function percentual(numero){
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
function soma(n1, n2){

    // processamento do calculo
    let calculo = Number(n1) + Number(n2)
    return Number(calculo.toFixed(2))
    
}

// calcula a subtração dos números
function subtracao(n1, n2){

    // processamento do calculo
    let calculo = Number(n1) - Number(n2)
    return Number(calculo.toFixed(2))

}

// calcula a multiplicação dos números
function multiplicacao(n1, n2){

    // processamento do calculo
    let calculo = Number(n1) * Number(n2)
    return Number(calculo.toFixed(2))
}

// calcula a divisão dos números
function divisao(n1, n2) {
    if (n2 === 0) return false // evita erro de divisão por zero
    
    let calculo = Number(n1) / Number(n2)
    return Number(calculo.toFixed(2))
}

function validacaoOperacoesBasicas(valor1, valor2, operador){
    let n1 = Number(String(valor1).replace(',', '.')) 
    let n2 = Number(String(valor2).replace(',', '.'))
    
    if(n1 == '' || isNaN(n1) || n2 == '' || isNaN(n2)){
        console.log('Erro: Digite um número válido')
        return false
    }
    else {
       
        if (operador === 'soma') {
            return soma(n1, n2)
        } else if (operador === 'subtração') {
            return subtracao(n1, n2)
        } else if (operador === 'multiplicação') {
            return multiplicacao(n1, n2)
        } else if (operador === 'divisão') {
            return divisao(n1, n2)
        } 
    }
    return true
}

function imc(n1, n2){
    let calculo = Number(n1) / Number((n2/100) ** 2 )
    return Number(calculo.toFixed(2))
}

function imcPeso(m){
    let resultado 

    if(m <= 18.5){
        resultado = 'Abaixo do peso'
    } else if(m >= 18.5 && m <= 24.9){ 
        resultado = 'Peso normal'
    } else if(m >= 25 && m <= 29.9){
        resultado = 'Sobrepeso'
    } else if(m >= 30 && m <= 34.9){
        resultado = 'Obesidade I'
    } else if(m >= 35 && m <= 39.9){
        resultado = 'Obesidade II'
    } else if(m >= 40){
        resultado = 'Obesidade III'
    }

    return resultado
}

function media(valor1, valor2, valor3, valor4){
    let n1 = Number(String(valor1).replace(',', '.'))
    let n2 = Number(String(valor2).replace(',', '.'))
    let n3 = Number(String(valor3).replace(',', '.'))
    let n4 = Number(String(valor4).replace(',', '.'))

    // validação de entradas vazias ou de letras
    if(n1 == '' || isNaN(n1) || n2 == '' || isNaN(n2)){
        console.log('Erro: Digite um número válido')
        return false
    }
    else {
        // processamento do calculo
        let calculo = (n1 + n2 + n3 + n4) / 4
        return Number(calculo.toFixed(2))
    }
}

function statusMedia(m, sexo) {
    let statusAluno

    // define se termina com O ou A
    let sufixo = (sexo && sexo.toLowerCase() === 'feminino') ? 'a' : 'o'

    if (m >= 70) {
        statusAluno = `aprovad${sufixo}`
    } else if (m >= 50 && m < 70) {
        statusAluno = 'recuperação'
    } else {
        statusAluno = `reprovad${sufixo}`
    }
    return statusAluno
}

function mediaFinal(m1, m2, m3, m4, valor2){
    let mediaAluno = media(m1, m2, m3, m4)
    let n2 = Number(String(valor2 || "0").replace(',', '.'))

    let calculo = (mediaAluno + n2) / 2

    return {
        inicial: mediaAluno,
        final: calculo.toFixed(2)
    }
}

// função para imprimir a tabuada usando While/Enquanto
function tabuada(n1, n2, n3, n4){

    // recebe a tabuada a ser gerada
    let tabInicio = Number(n1)
    let tabFinal =  Number(n2)
    let contInicio =  Number(n3)
    let contFinal =  Number(n4)

        if (tabInicio > tabFinal || contInicio > contFinal) {
        console.log("Não é possível fazer o cálculo da tabuada em formato decrescente.")
        return false // Retorna false para encerrar a função aqui
        }   else if(tabInicio >= 2 && tabFinal <= 100 && contInicio >= 0 && contFinal <= 50){
                while (tabInicio <= tabFinal){
                    let contador = contInicio
                    console.log(`\nTabuada do [${tabInicio}]`) 

        // while de dentro (Controla as linhas: x1, x2, x3...)
                    while (contador <= contFinal) {
                
                        let resultado = tabInicio * contador
                        console.log(`${tabInicio} x ${contador} = ${resultado}`)
            
                        contador++ // Faz a linha subir (1, 2, 3...) 
                }
            tabInicio++
            } 
        }else {
        console.log("Valores inválidos! Verifique os limites.")
    }
}

function fatorial(n1){
    let fat = Number(n1)

    if (fat === 0) return false
    
        let resultado = 1
        let sequencia = "" // mochila para guardar "5x4x3..."
        let numero = n1
    
        while (fat >= 1) {
            
            resultado *= fat

            if (fat > 1) {
            sequencia += fat + " x "
            } else {
            sequencia += fat
        }

        // agora, diminuímos o 'fat' em 1 para a próxima volta
        fat = fat - 1
    }
    console.log(`O fatorial de ${numero} é ${sequencia} = ${resultado}`)
    return resultado
}

function validacao(valor1, valor2 = 0){
    let n1 = Number(String(valor1).replace(',', '.')) 
    let n2 = Number(String(valor2).replace(',', '.'))
    
    if(valor1 == '' || isNaN(n1) || isNaN(n2)){
        console.log('Erro: Digite um número válido')
        return false
    }
    else {
       return [n1, n2]
    }
}

function imparOuPar(n1, n2, escolha){
    let numero = Number(n1) 
    let numero2 = Number(n2)

    // objeto organizado
    let dados = {
        listaPares: "",    // Mochila vazia para os pares
        listaImpares: "",  // Mochila vazia para os ímpares
        qtdePares: 0,
        qtdeImpares: 0
    }

    while(numero <= numero2){

    if (numero % 2 == 0) {
    // se o resto da divisão por 2 for igual a zero...
        dados.listaPares += numero + "\n"
        dados.qtdePares++  
    }
    // aumenta o seu "balde" de quantidade de pares
     else {
    // caso contrário (se sobrar 1)...
        dados.listaImpares += numero + "\n"
    // aumenta o seu "balde" de quantidade de impares
        dados.qtdeImpares++
        }

    numero++
    }

    if (escolha === 'p' || escolha === 'a') {
        console.log("Lista de números Pares:")
        console.log(dados.listaPares)
        console.log(`Qtde de números encontrados: ${dados.qtdePares}`)
    }

    if (escolha === 'i' || escolha === 'a') {
        console.log("\nLista de números Impares:")
        console.log(dados.listaImpares)
        console.log(`Qtde de números encontrados: ${dados.qtdeImpares}`)
    }
}

function imparOuParValidacao(valor1, valor2, escolha){
    let n1 = Number(String(valor1).replace(',', '.')) 
    let n2 = Number(String(valor2).replace(',', '.'))
    
    if(valor1 == '' || isNaN(n1) || valor2 == '' || isNaN(n2)){
        console.log('Digite valores válidos em todos os campos!')
        return false
    } else if (n1 >= 0 || n1 <= 500 || n2 >= 100 || n2 <= 1000) {
        console.log('Erro: O valor inicial deve ser entre 0-500 e o final entre 100-1000.')
        return false
    }

    // impedir números iguais
    else if (n1 === n2) {
        console.log('Erro: Os números não podem ser iguais.')
        return false
    }

    // impedir Inicial MAIOR que Final
    else if (n1 > n2) {
        console.log('Erro: O número inicial não pode ser maior que o final.')
        return false
    }
    else {
       return imparOuPar(n1, n2, escolha)
    }
}

// tornando as funções públicas
module.exports = {
    jurosCompostos,
    percentual,

    // para as operações basicas da matemática
    soma,
    subtracao,
    multiplicacao,
    divisao,
    validacaoOperacoesBasicas,

    // para IMC
    imc,
    imcPeso,

    // para média
    media,
    statusMedia,
    mediaFinal,

    // para tabuada
    tabuada,

    // para fatorial
    fatorial,

    // validação para IMC e fatorial
    validacao,

    // para impar e par
    imparOuPar,
    imparOuParValidacao
}