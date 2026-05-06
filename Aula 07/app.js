/* *********************************************************************
* Objetivo: Arquivo responsável pela criação da API
* Data: 17/04/2026  
* Autor: Fernanda
* Versão: 1.0
***********************************************************************/

/* import das dependências para criar a API */
const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')   

/* import das CONTROLLERS do projeto */
const controllerFilme = require('./controller/filme/controller_filme.js')

/* criando um objeto para manipular dados do body da API em formato JSON */
const bodyParserJSON = bodyParser.json()

/* criando um objeto para manipular o express */
const app = express()

/* conjuntos de permissões a serem aplicadas no CORS da API */
const corsOptions = {
    origin: ['*'], /* a origem da requisição, podendo ser um IP ou *(Todos) */ 
    methods: 'GET, POST, PUT, DELETE, OPTIONS', /* são os verbos que serão liberados na API (GET, POST, PUT, DELETE) */
    alowedHeaders: ['Content-type', 'Autorization'], /* são permissões de cabeçalho do CORS */
}

/* configura as permissões da API através do CORS */
app.use(cors(corsOptions))

// endpoints

// endpoint para inserir o filme
app.post('/v1/senai/locadora/filme', bodyParserJSON, async function(request, response){
    // console.log(dados) para ver se está tudo certo

    // recebe o conteúdo dentro do body da requisição
    let dados = request.body

    // recebe o content type da requisição, para validar a
    let contentType = request.headers['content-type']

    console.log(request.headers)

    let result = await controllerFilme.inserirNovoFilme(dados, contentType)

    // console.log(result) para ver se está tudo certo

    response.status(result.status_code)
    response.json(result)
})

// endpoint para listar todos os filmes
app.get('/v1/senai/locadora/filme', async function(request, response) {
    let result = await controllerFilme.listarFilme()

    response.status(result.status_code)
    response.json(result)
})

// endpoint para buscar o filme pelo id
app.get('/v1/senai/locadora/filme/:id', async function(request, response){
    // recebe o ID via parametro
    let id = request.params.id

    let result = await controllerFilme.buscarFilme(id)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para atualizar o filme pelo id
app.put('/v1/senai/locadora/filme/:id', bodyParserJSON, async function(request, response){

    // recebe o content type da requisição
    let contentType = request.headers['content-type']

    // recebe o ID do registro a ser atualizado
    let id = request.params.id

    // recebe os dados enviados no corpo da requisição
    let dados = request.body

    /*
        chama a função de atualizar na controller e encaminha os dados, id e content-type
        obedecendo a ordem de criação na função da controller
    */
    let result = await controllerFilme.atualizarFilme(dados, contentType, id)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para deletar o filme pelo id
app.delete('/v1/senai/locadora/filme/:id', async function(request, response){

    // recebe o ID do registro a ser deletado
    let id = request.params.id

    /*
        chama a função de deletar na controller e encaminha os dados, id e content-type
        obedecendo a ordem de criação na função da controller
    */
    let result = await controllerFilme.excluirFilme(id)

    response.status(result.status_code)
    response.json(result)
})

app.listen(8080, function(){
    console.log('API funcionando e aguardando novas requisições')
})