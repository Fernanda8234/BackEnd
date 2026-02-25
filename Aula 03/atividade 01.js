/********************************************************************
 * Objetivo: Calcular juros compostos de produtos
 * Data: 06/02/2026
 * Autor: Fernanda
 * Versão: 1.1
 *******************************************************************/

// biblioteca
const readline = require('readline')

// entrada de dados
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

entradaDeDados.question(`Nome do Cliente: `, function(nomeCliente){
    entradaDeDados.question(`Qual é o produto: `, function(produto){
        entradaDeDados.question(`Valor da Compra: `, function(valorCompra){
            entradaDeDados.question(`Taxa de Juros: `, function(juros){
                entradaDeDados.question(`Escolha a opção \n(1) Meses \n(2) Anos \nOpção: `, function perguntaOpcao(opcao){ 
                    /* perguntaOpcao é uma função para validar a escolha: 
                       se a opção for inválida ou estiver vazia, 
                       o programa repete a pergunta em vez de fechar */
                    if(opcao == '' || opcao == null){
                        console.log('Erro: é obrigatório o escolher uma das opções!')
                        return entradaDeDados.question(`Escolha a opção \n(1) Meses \n(2) Anos \nOpção: `, perguntaOpcao);
                    }
                        else if (opcao !== '1' && opcao !== '2') {
                            console.log('Erro: Opção inválida! Escolha 1 ou 2.');
                            return entradaDeDados.question(`Escolha a opção \n(1) Meses \n(2) Anos \nOpção: `, perguntaOpcao);
                        }
                        entradaDeDados.question(`Tempo de pagamento: `, function(tempoPagamento){
                        
                            // Parcelas em Meses
                            if (opcao === "1") {
                                if(nomeCliente == '' || produto == '' || valorCompra == '' || juros == '' || tempoPagamento == ''){
                                    console.log('Erro: é obrigatório o preenchimento de todos os dados!')
                                } 
                                    else if(!isNaN(nomeCliente) && !isNaN(produto)) { // apenas letras
                                        console.log('Erro: não é possível calcular a compra com a entrada de números')
                                    }
                                        else if(isNaN(valorCompra) || isNaN(juros) || isNaN(tempoPagamento)) { // apenas números
                                            console.log('Erro: não é possível calcular a compra com a entrada de letras')
                                        }
                                            else if((valorCompra) <=0 || (juros) <=0 || (tempoPagamento) <=0 ) { // o valor não pode ser menor ou igual a 0
                                                console.log('Erro: não é possível calcular a compra com os valores em 0')
                                            }
                                                else{
                                                    let calculo = Number(valorCompra) * (1 + Number(juros) / 100) ** Number(tempoPagamento) // calculo

                                                    let acrescimo = Number(calculo) - Number(valorCompra)
               
                                                    console.log(`******************* BlackProdutos *********************
                                                    \nMuito obrigado por realizar a sua compra conosco Sr(a) ${nomeCliente}.
                                                    \nA compra do produto ${produto}, tem um valor de: ${valorCompra}.
                                                    \nA sua compra será parcelada em ${tempoPagamento} vezes e o Sr(a) pagará: ${calculo.toFixed(2)}.
                                                    \nO acréscimo realizado ao valor de: ${valorCompra} será de ${acrescimo.toFixed(2)}
                                                    \nMuito obrigado por escolher a BlackProdutos.
                                                    \n*******************************************************`)
                            } // validou
                        } // opcão 1
                        
                            // Parcelas em Anos
                            else if (opcao === "2"){
                                if(nomeCliente == '' || produto == '' || valorCompra == '' || juros == '' || tempoPagamento == ''){
                                    console.log('Erro: é obrigatório o preenchimento de todos os dados!')
                                } 
                                    else if(!isNaN(nomeCliente) && !isNaN(produto)) { // apenas letras
                                        console.log('Erro: não é possível calcular a compra com a entrada de números')
                                    }
                                        else if(isNaN(valorCompra) || isNaN(juros) || isNaN(tempoPagamento)) { // apenas números
                                            console.log('Erro: não é possível calcular a compra com a entrada de letras')
                                        }
                                            else if((valorCompra) <=0 || (juros) <=0 || (tempoPagamento) <=0 ) { // o valor não pode ser menor ou igual a 0
                                                console.log('Erro: não é possível calcular a compra com os valores em 0')
                                            }
                                                else{
        
                                                let anos = Number(tempoPagamento) * 12
        
                                                let calculo = Number(valorCompra) * (1 + Number(juros) / 100) ** Number(anos)
        
                                                let acrescimo = Number(calculo) - Number(valorCompra)
                       
                                                console.log(`******************* BlackProdutos *********************
                                                \nMuito obrigado por realizar a sua compra conosco Sr(a) ${nomeCliente}.
                                                \nA compra do produto ${produto}, tem um valor de: ${valorCompra}.
                                                \nA sua compra será parcelada em ${anos} vezes e o Sr(a) pagará: ${calculo.toFixed(2)}.
                                                \nO acréscimo realizado ao valor de: ${valorCompra} será de ${acrescimo.toFixed(2)}.
                                                \nMuito obrigado por escolher a BlackProdutos.
                                                \n*******************************************************`)
                            } // validou
                        } // opção 2
                    }) // tempo de pagamento
                }) // opções
            }) // juros da compra
        }) // valor da compra
    }) // produto
}) // cliente