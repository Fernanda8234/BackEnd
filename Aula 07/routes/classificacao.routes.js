// import do express
const express = require('express')
const bodyParser    = require('body-parser') 

// criando um objeto para manipular dados do body da API em formato JSON 
const bodyParserJSON = bodyParser.json()

// cria um objeto de rota para o arquivo
const router = express.Router()

// import da controller de classificação indicativa
const controllerClassificacao = require('../controller/classificacao_indicativa/controller_classificacao_indicativa.js')

router.post('/', bodyParserJSON, async function(request, response){
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerClassificacao.inserirClassificacao(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.get('/', async function(request, response){
    let result = await controllerClassificacao.listarClassificacao()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', async function(request, response){
    let id = request.params.id

    let result = await controllerClassificacao.buscarClassificacao(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', bodyParserJSON, async function(request, response){
    let id = request.params.id

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerClassificacao.atualizarClassificacao(dados, contentType, id)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id', async function(request, response){
    let id = request.params.id
    
    let result = await controllerClassificacao.excluirClassificacao(id)

    response.status(result.status_code)
    response.json(result)
})


// export para o app ter acesso as rotas
module.exports = router