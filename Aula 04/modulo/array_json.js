/********************************************************************
 * Objetivo: Manipular dados utilizando Array e Json
 * Data: 05/03/2026
 * Autor: Fernanda
 * Versão: 1.0
 *******************************************************************/

/* 
    [ ] -> representa um objeto do tipo Array
    { } -> representa um objeto do tipo JSON

    Array -> é um objeto na memória que permite trabalhar com vários valores
        em um único objeto

        let nome  = 'José'
        let nome2 = 'Maria'
        let nome3 = 'João'

                 indice    0       1       2
        let nome   =   ['José', 'Maria', 'João']

    JSON -> é um objeto na memória que permite trabalhar com CHAVE e VALOR

        let nome     = 'José'
        let telefone = '123456789'
        let email    = 'jose@gmail.com'

        let cliente = {
                        "nome": "José",
                        "telefone": "123456789",
                        "email": "jose@gmail.com"
                        }
*/

// formas de criar um Array (permite todos os tipos de dados juntos)
const listaDeNomes = ['José', 'Maria', 'João', 'André', 'Alex']
const listaDeClientes = []
const listaDeFornecedores = []

const exibirDados = function(){
    // exibe o objeto Array e seu conteúdo
    console.log(listaDeNomes)

    // exibe o objeto Array em formato de tabela com seus indices
    console.table(listaDeNomes)

    // exibe apenas o valor do respectivo indice do Array
    console.log(listaDeNomes[0])

    // retorna o tipo de dados de um indice do Array
    console.log(typeof(listaDeNomes[4]))

    console.log(`O nome do cliente é: ${listaDeNomes[0]}`)
    console.log(`O nome do cliente é: ${listaDeNomes[1]}`)
    console.log(`O nome do cliente é: ${listaDeNomes[2]}`)
    console.log(`O nome do cliente é: ${listaDeNomes[3]}`)
    console.log(`O nome do cliente é: ${listaDeNomes[4]}`)
    
    // estrutura de repetição

        console.log(`--------------------While--------------------`)
        let cont = 0
        while(cont < listaDeNomes.length){
            console.log(`O nome do cliente é: ${listaDeNomes[cont]}`)
            cont+= 1
        }

        console.log(`---------------------For---------------------`)
        for (let contador = 0; contador < listaDeNomes.length; contador++){
            console.log(`O nome do cliente é: ${listaDeNomes[contador]}`)
        }
        
        // retorna o conteúdo de cada elemento através de uma CALL BACK
        console.log(`------------------For Each-------------------`)
        listaDeNomes.forEach(function(cliente){
            console.log(`O nome do cliente é: ${cliente}`)
        })

        /*
            retorna o indice do elemento, e será preciso colocar dentro do objeto do Array
            ex: ${item} - indice
            ex: listaDeNomes[item] - conteúdo
            praticamente igual ao FOR e WHILE
        */
        console.log(`-------------------For In--------------------`)
        for(item in listaDeNomes){
            console.log(`O nome do cliente é: ${listaDeNomes[item]}`)
        }

        /*
            percorre o Array e retorna somente o conteúdo de cada indice,
            sendo muito parecido com o ForEach 
        */
        console.log(`-------------------For Of--------------------`)
        for(cliente of listaDeNomes){
            console.log(`O nome do cliente é: ${cliente}`)
        }

        // quantidade de elementos
        console.log(listaDeNomes.length)
}

const manipularDados = function(){

    // adicionando valores novos no Array através de indices
    listaDeClientes[0] = 'José da Silva'
    listaDeClientes[1] = 'Maria da Silva'
    listaDeClientes[2] = 'João da Silva'

    console.log(listaDeClientes)

    // permite adicionar novos valores no Array, sempre no final da lista
    listaDeFornecedores.push('Luizinho da Silva')
    listaDeFornecedores.push('Zezinho da Silva')
    listaDeFornecedores.push('Huguinho da Silva')
    listaDeFornecedores.push('Luiz da Silva', 'André da Silva', 'Carlos da Silva')
   
    console.table(listaDeFornecedores)
}
//exibirDados()
manipularDados()