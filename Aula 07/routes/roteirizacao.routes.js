const express = require('express')
const bodyParser    = require('body-parser') 
const bodyParserJSON = bodyParser.json()

const router = express.Router()

const controllerRoteirizacao = require('../controller/roteirizacao/controller_roteirizacao.js')

router.post('/', bodyParserJSON, async function(request, response){
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerRoteirizacao.inserirRoteirizacao(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.get('/', async function(request, response){
    let result = await controllerRoteirizacao.listarRoteirizacao()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', async function(request, response){
    let id = request.params.id

    let result = await controllerRoteirizacao.buscarRoteirizacao(id)
    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', bodyParserJSON, async function(request, response){
    let id = request.params.id

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerRoteirizacao.atualizarRoteirizacao(dados, contentType, id)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id', async function(request, response){
    let id = request.params.id
    
    let result = await controllerRoteirizacao.excluirRoteirizacao(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router