/*
Comentário 
    em 
bloco
*/

//Imprime no terminal um conteúdo
console.log('Testando o print  do console')

//Permite criar uma variavel
var nome = 'Fernanda'

console.log(nome)

//Formas de concatenar variaveis e texto
console.log('O nome do usuário é: ' + nome)
console.log(`O nome do usuário é: ${nome}`)

//Import da biblioteca para captar entrada de dados via terminal
var readline = require('readline')

//Cria uma interface para entrada e saída de dados pelo terminal
var entradaDeDados = readline.createInterface({
    input:  process.stdin,
    output: process.stdout
})

/*Função para retornar o nome digitado no terminal
    O método question após a digitação chama a sua função "CALL BACK"
        para entregar o que foi digitado no terminal, através do arqgumento
            nomeUsuario */
    
entradaDeDados.question('Digite o seu nome:', function(nomeUsuario){
    
    //Entrada de dados para o Email
    entradaDeDados.question('Digite o seu email:', function(emailUsuario){
        console.log('O nome do usuário é: ' + nomeUsuario)
        console.log(`O email do usuário é: ${emailUsuario}`)
    })
})