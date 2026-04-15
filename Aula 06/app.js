/* *********************************************************************
* Objetivo: Arquivo responsável pela criação da API do projeto de Whatsapp
* Data: 13/04/2026  
* Autor: Fernanda
* Versão: 1.0
***********************************************************************/

/* import das dependências para criar a API */
const express   = require('express')
const cors      = require('cors')

/* criando um objeto para manipular o express */
const app = express()

/* conjuntos de permissões a serem aplicadas no CORS da API */
const corsOptions = {
    origin: ['*'], /* a origem da requisição, podendo ser um IP ou *(Todos) */ 
    methods: 'GET', /* são os verbos que serão liberados na API (GET, POST, PUT, DELETE) */
    alowedHeaders: ['Content-type', 'Autorization'], /* são permissões de cabeçalho do CORS */
}

/* configura as permissões da API através do CORS */
app.use(cors(corsOptions))

/* 
    Response -> retornos da API 
    Request  -> são chegadas de dados na API
*/

const meusContatos = require('./modulo/funcoes.js')

app.get('/v1/whatsapp/usuarios', function(request, response){
    // recebe a variável UF através da URL separado pela /
    let usuarios = meusContatos.listaUsuarios()

    if(usuarios){
        response.status(200)
        response.json(usuarios)
    }else{
        response.status(404)
        response.json({"message": "Usuários não encontrados!"})
    }
})

app.get('/v1/whatsapp/dados/perfil/:numero', function(request, response){
    let telefone = request.params.numero
    let usuario = meusContatos.dadosAlteraveis(telefone)

    if(usuario){
        response.status(200)
        response.json(usuario)
    }else{
        response.status(404)
        response.json({"message": "Telefone não encontrado!"})
    }
})

app.get('/v1/whatsapp/dados/pessoais/:numero', function(request, response){
    let telefone = request.params.numero
    let contato = request.query.contato
    let usuario = meusContatos.dadosPessoais(telefone, contato)

    if(usuario){
        response.status(200)
        response.json(usuario)
    }else{
        response.status(404)
        response.json({"message": "Telefone não encontrado!"})
    }
})

app.get('/v1/whatsapp/dados/mensagens/:numero', function(request, response){
    let telefone = request.params.numero
    let usuario = meusContatos.dadosMensagens(telefone)

    if(usuario){
        response.status(200)
        response.json(usuario)
    }else{
        response.status(404)
        response.json({"message": "Telefone não encontrado!"})
    }
})

// via Query
app.get('/v1/whatsapp/dados/usuario/:numero', function(request, response){
    let telefone = request.params.numero // como um id
    let contato = request.query.contato
    let usuario = meusContatos.dadosUsuarios(telefone, contato)

    if(usuario){
        response.status(200)
        response.json(usuario)
    }else{
        response.status(404)
        response.json({"message": "Telefone não encontrado!"})
    }
})

// numero param -> chave query
app.get('/v1/whatsapp/usuario/:numero', function(request, response){
    let telefone = request.params.numero
    let palavra = request.query.chave
    let usuario = meusContatos.palavraChave(telefone, palavra)

    if(usuario){
        response.status(200)
        response.json(usuario)
    }else{
        response.status(404)
        response.json({"message": "A palavra digitada não foi encontrada!"})
    }
})

// ROTA DE DOCUMENTAÇÃO
app.get('/v1/whatsapp/doc', function(request, response){
    let docAPI = {
    "API-description": "API para manipular dados de Whatsapp",
    "Date": "2026-04-13",
    "Development": "Fernanda",
    "Version": "1.0",
    "EndPoints": [
            {
                "id": 1,
                "Rota 1": "/v1/whatsapp/usuarios",
                "obs": "Retorna a lista de todos os usuários"
            },
            {
                "id": 2,
                "Rota 2": "/v1/whatsapp/dados/perfil/11987876567",
                "obs": "Retorna os dados alteráveis do perfil do usuário"
            },
            {
                "id": 3,
                "Rota 3": "/v1/whatsapp/dados/pessoais/11966578996?contato=John%20Guttemberg",
                "obs": "Retorna os dados pessoais dos contatos do usuário filtrando pelo contato"
            },
            {
                "id": 4,
                "Rota 4": "/v1/whatsapp/dados/mensagens/11955577796",
                "obs": "Retorna todas as mensagens do usuário"
            },
            {
                "id": 5,
                "Rota 5": "/v1/whatsapp/dados/usuario/1194457796?contato=Wally%20Gator",
                "obs": "Retorna dados do usuário filtrando pelo contato"
            },
            {
                "id": 6,
                "Rota 6": "/v1/whatsapp/usuario/11987876567?chave=Leonid",
                "obs": "Retorna a busca pela palavra-chave 'Leonid' nas mensagens do usuário"
            }
        ]
    }
    response.status(200)
    response.json(docAPI)
})

app.listen(8080, function(){
    console.log('API funcionando e aguardando novas requisições')
})