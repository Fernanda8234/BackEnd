const express = require('express')
const bodyParser    = require('body-parser') 
const bodyParserJSON = bodyParser.json()

const router = express.Router()

const controllerElenco = require('../controller/elenco/controller_elenco')

router.post('/', bodyParserJSON, async function(request, response){
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerElenco.inserirElenco(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.get('/', async function(request, response){
    let result = await controllerElenco.listarElenco()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', async function(request, response){
    let id = request.params.id

    let result = await controllerElenco.buscarElenco(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', bodyParserJSON, async function(request, response){
    let id = request.params.id

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerElenco.atualizarElenco(dados, contentType, id)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id', async function(request, response){
    let id = request.params.id
    
    let result = await controllerElenco.excluirElenco(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router