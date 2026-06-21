const express = require('express')
const bodyParser    = require('body-parser') 
const bodyParserJSON = bodyParser.json()

const router = express.Router()

const controllerNomeArtistico = require('../controller/nome_artistico/controller_nome_artistico.js')

router.post('/', bodyParserJSON, async function(request, response){
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerNomeArtistico.inserirNomeArtistico(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.get('/', async function(request, response){
    let result = await controllerNomeArtistico.listarNomeArtistico()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', async function(request, response){
    let id = request.params.id

    let result = await controllerNomeArtistico.buscarNomeArtistico(id)
    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', bodyParserJSON, async function(request, response){
    let id = request.params.id

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerNomeArtistico.atualizarNomeArtistico(dados, contentType, id)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id', async function(request, response){
    let id = request.params.id
    
    let result = await controllerNomeArtistico.excluirNomeArtistico(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router