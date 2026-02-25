/******************************************************************
 * Objetivo: Calcular médias escolares
 * Data: 29/01/2026
 * Autor: Fernanda
 * Versão: 1.0
 ******************************************************************/

/*
    Existem 3 forma de criação de variáveis

        var -> Permite a criação de um espaço na memória 
                do tipo variável. Foi utilizado muito 
                em projetos antigos.
                Recomendação: Caso você queira utilizar, 
                recomenda-se na criação de variáveis globais 
                (inicio do código)

        let -> Permite a criação de um espaço na memória
                do tipo variável. A utilizaçao deste padrão é 
                para a criação dentro de blocos de programação local { }.
                Essa variável nasce e morre dentro deste bloco.
                Não é recomendado a sua utilização em escopo global.

        const -> Permite a criação de um espaço na memória
            onde não sofrerá alteração durante o código. A const
            pode ser utilizada dentro e fora de bloco { }.
            Dica: Caso você queira diferenciar uma const, um var ou 
            um let.
            A const você poder criar com letras MAIUSCULAS.

    

*/

//Import da biblioteca
const readline = require('readline')

//Cria o objeto para entrada de dados
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//Entrada do nome
entradaDeDados.question('Digite o nome do aluno:', function(nome){
    //Recebe o nome do aluno que foi digitado
    let nomeAluno = nome

    //Entrada da nota1
    entradaDeDados.question('Digite a nota 1:', function(valor1){
        let nota1 = valor1

        //Entrada da nota2
        entradaDeDados.question('Digite a nota 2:', function(valor2){
            let nota2 = valor2

            //Entrada da nota3
            entradaDeDados.question('Digite a nota 3:', function(valor3){
                let nota3 = valor3

                //Entrada da nota4
                entradaDeDados.question('Digite a nota 4:', function(valor4){
                    let nota4 = valor4

                    /*
                        Operadores de Comparação

                        ==  -> Permite comparar a igualdade de dois conteúdos
                        <   -> Permite caompara valores menores
                        >   -> Permite comparar valores maiores
                        >=  -> Permite comparar valores maiores ou iguais
                        <=  -> Permite comparar valores menores ou iguais
                        !=  -> Permite comparar a diferença entre conteúdos
                        === -> Permite comparar o a igualdade de conteúdos
                                 e a igualdade da tipagem de dados
                        !== -> Permite comparar a diferença de conteúdos e a 
                                igualdade de tipos de dados
                        ==! -> Permite comparar a igualdade de conteudos e a
                                diferença de tipos de dados
                        !=! -> Permite comparar a diferença de conteúdos e a
                                diferença de tipos de dados

                        Operadores Lógicos
                            E   -> AND -> &&
                            OU  -> OR  -> ||
                            NÃO -> NOT -> !

                    */

                                            /*
                            Conversões de tipos de dados
                                parseInt() -> Permite converter uma String para número INTEIRO
                                parseFloat() -> Permite converter uma String para número DECIMAL
                                Number() -> Permite converter uma String para NUMERO (INTEIRO OU DECIMAL)
                                String() -> Permite converter um conteúdo para STRING
                                Boolean() -> Permite converter um conteúdo para BOOLEANO
                            typeof() -> Permite verificar o tipo de dados de uma variável
                            toFixed() -> Permite fixar a qtde de casas decimais.
                        */
                  
                   //Validação de entrada vazia
                    if(nomeAluno == '' || nota1 == '' || nota2 == '' || nota3 == '' || nota4 == ''){
                        console.log('ERRO: É obrigatório o preenchimento de todos os dados !!!')
                    
                        //Validação de numeros entre 0 e 100
                        }else if(nota1 < 0 || nota1 > 100 || nota2 < 0 || nota2 > 100 || nota3 < 0 || nota3 > 100 || nota4 < 0 || nota4 > 100){
                            console.log('ERRO: Somente é permitido a entrada de valores entre 0 e 100.')
                            
                            /*Validação para a entrada de letras nas notas
                              isNaN() -> permite validar se o conteúdo da 
                              variável tem algum caracter ao invés de número*/

                            }else if(isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || isNaN(nota4)){
                                console.log('ERRO: Não é possível calcular a média com a entrada de letras nas notas do aluno!!!')
                                }else{
                                    let statusAluno
                        
                                        //Calculo da Média
                                        let media = (Number(nota1) + Number(nota2) + Number(nota3) + Number(nota4))/4
                        
                                            //Validação do Status de aprovação do aluno
                                            if(media >= 70){
                                                statusAluno = 'APROVADO'
                                            }else if (media >=50 && media < 70){
                                                statusAluno = 'RECUPERAÇÃO'
                                            }else if(media < 50){
                                                statusAluno = 'REPROVADO'
                                            }
                        
                        //Saída do boletim do aluno
                        console.log(`ALUNO: ${nomeAluno} \nMédia Final: ${media.toFixed(2)} \nStatus do Aluno: ${statusAluno}`)
                        
                    }


                })//Fecha a nota 4
            })//Fecha a nota 3
        })//Fecha a nota 2
    })//Fecha a nota 1
})//Fecha o nome