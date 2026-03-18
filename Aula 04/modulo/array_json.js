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
const listaDeNomes = ['José', 'Maria', 'João', 'André', 'Alex', 'Carlos', 'Ana', 'Bruna', 'Jake']
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

    // permite adicionar novos elementos no Array, sempre no final da lista
    listaDeFornecedores.push('Luizinho da Silva')
    listaDeFornecedores.push('Zezinho da Silva')
    listaDeFornecedores.push('Huguinho da Silva')
    listaDeFornecedores.push('Luiz da Silva', 'André da Silva', 'Carlos da Silva')
   
    console.table(listaDeFornecedores)

    // permite adicionar novos elementos no Array, sempre no inicio da lista
    listaDeFornecedores.unshift('Ana Carolina')
    console.table(listaDeFornecedores)

    // permite remover elementos do final da lista
    listaDeFornecedores.pop()
    console.table(listaDeFornecedores)

    // permite remover elementos do inicio da lista
    listaDeFornecedores.shift()
    console.table(listaDeFornecedores)

    /* 
        splice() -> permite remover um elemento baseado no indice da lista
        splice(indice, qtde de elementos)
    */
    listaDeFornecedores.splice(2,1)
    console.table(listaDeFornecedores)

    /* 
        splice() -> permite adicionar um novo elemento em um determinado
        lugar do Array (indice)
        indice, 0 -> significada que não será removido ninguém, novo conteúdo
    */
    listaDeFornecedores.splice(2,0,'Carlinhos da Silva')
    console.table(listaDeFornecedores)

    // permite substituir o conteúdo
    listaDeFornecedores[1] = 'Ana da Silva'
    console.table(listaDeFornecedores)
}

const removerItem = function(nome){
   
    /* 
        for(indice in listaDeNomes){
            if(listaDeNomes[indice] == nome){
                listaDeNomes.splice(indice, 1)
            }
        } 
    */

    /*
        retorna o indice de um elemento fazendo a busca pelo valor
        se o indexOf não encontrar o conteúdo ele devolve -1
    */
    let indice = listaDeNomes.indexOf(nome)
    if(indice != -1){
        listaDeNomes.splice(indice, 1)
        return true
    } else {
        return false
    }

}

const verificarItem = function(nome){

    // verifica a existência de um conteúdo dentro de uma lista (true/false)
    return listaDeNomes.includes(nome)
}

const quantidadeItens = function(nome){

    let cont = 0
    listaDeNomes.forEach(function(item){
        if(String(item).toUpperCase() == String(nome).toUpperCase())
            cont +=1
    })

    return cont
}

const criandoDadosJSON = function(){
    let aluno = {
        "nome": "José",
        "ra": 123456,
        "telefone": "912345678",
        "email": "jose@gmail.com"
    }
    // exibindo o objeto do JSON
    console.log(aluno)
    console.table(aluno)

    // exibindo apenas um atributo do JSON
    console.log(aluno.nome)
    console.log(aluno.email)

    // adiciona um novo atributo no JSON
    aluno.sexo = 'masculino'
    console.log(aluno)

    // remove um atribulo do JSON
    delete aluno.telefone
    console.log(aluno)
}

const cadastroDeProdutos = function(){
    let cores = [
        {"id": 1, "cor": "Branco"}, // indice 0
        {"id": 2, "cor": "Preto"},  // indice 1
        {"id": 3, "cor": "Azul"},   // indice 2
        {"id": 4, "cor": "Rosa"},   // indice 3 
        {"id": 5, "cor": "Cinza"}   // indice 4
    ]
   
    /*
    console.log(cores)
    console.table(cores)
    console.log(cores[2].cor)
    */

    let marcas = [
        {"id": 1, "marca": "LG",        "telefone": "912345678", "email": "lg@gmail.com.br"},          // indice 0
        {"id": 2, "marca": "Dell",      "telefone": "923456789", "email": "dell@gmail.com.br"},        // indice 1
        {"id": 3, "marca": "Lenovo",    "telefone": "934567891", "email": "lenovo@gmail.com.br"},      // indice 2
        {"id": 4, "marca": "Apple",     "telefone": "945678912", "email": "apple@gmail.com.br"},       // indice 3 
        {"id": 5, "marca": "Rayzer",    "telefone": "956789123", "email": "rayzer@gmail.com.br"},      // indice 4
        {"id": 6, "marca": "Logitech",  "telefone": "967891234", "email": "logitech@gmail.com.br"},    // indice 5
        {"id": 7, "marca": "Multilaser","telefone": "978912345", "email": "multilaser@gmail.com.br"}   // indice 6
    ]

    //console.log(marcas)
    
    let produtos = [
        {
            "id": 1, 
            "produto": "Monitor",
            "descricao": "27 polegadas",
            "marca": [
                marcas[1].marca
            ],
            "qtde": 20,
            "cor": [
                cores[4],
                cores[1]
            ],
            "valor": 800.50
        }, // indice 0
        {
            "id": 2, 
            "produto": "Teclado",
            "descricao": "Teclado mecanico RGB",
            "marca": [marcas[5].marca],
            "qtde": 200,
            "cor": cores,
            "valor": 150
        }, // indice 1
        {
            "id": 3, 
            "produto": "Mouse",
            "descricao": "Mouse sem fio",
            "marca": [
                marcas[0].marca,
                marcas[1].marca,
                marcas[5].marca
            ],
            "qtde": 500,
            "cor": [
                cores[0],
                cores[1],
                cores[4]
            ],
            "valor": 80
        } // indice 3
    ]

    // console.table(produtos)

    // percorre o objeto de produto para trazer os dados de cada produto
    
    console.log(`--------------------Produtos--------------------`)
    produtos.forEach(function(itemProduto){
        console.log(`Produto: ${itemProduto.produto}`)
            
        // percorre o objeto de marca dentro de cada produto, para trazer as marcas
        itemProduto.marca.forEach(function(itemMarca){
                console.log(`Marca: ${itemMarca}`)
            })
        
            // percorre o objeto de cor dentro de cada produto, para trazer as cores
            itemProduto.cor.forEach(function(itemCor){
                console.log(`Cor: ${itemCor.cor}`)
                })
    }) 

    // pesquisando um produto pelo nome
    console.log(`--------------------Pesquisando produtos pelo nome--------------------`)
    let produto = 'Monitor'

    produtos.forEach(function(itemProduto){
        if(String(itemProduto.produto).toUpperCase() == String(produto).toUpperCase()){
            console.log(itemProduto)
        }
    })

    // pesquisando um produto pela cor
    console.log(`--------------------Pesquisando produtos pela cor--------------------`)
    let cor = 'Rosa'
    let status = false

    produtos.forEach(function(itemProduto){
       itemProduto.cor.forEach(function(itemCor){
        if(String(itemCor.cor).toUpperCase() == String(cor).toUpperCase()){
            console.log(itemProduto)
            status = true
            }
        })  
    })
    if(!status)
        console.log('O item pesquisado não foi encontrado')
}

/*
    exibirDados()
    manipularDados()
    console.table(listaDeNomes)
    removerItem('José')
    removerItem('Ana')
    console.table(listaDeNomes)
    console.table(removerItem('ze'))


    let resposta = removerItem('A')
        if(resposta)
            console.log('Item removido com sucesso')
        else
            console.log('Item não encontro')
    
    verificarItem('A')
*/

cadastroDeProdutos()