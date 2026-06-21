const express = require('express')
const bodyParser    = require('body-parser') 
const bodyParserJSON = bodyParser.json()

const router = express.Router()

const controllerFilme = require('../controller/filme/controller_filme.js')

router.post('/', bodyParserJSON, async function(request, response){
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

router.get('/', async function(request, response) {
    let result = await controllerFilme.listarFilme()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', async function(request, response){
    // recebe o ID via parametro
    let id = request.params.id

    let result = await controllerFilme.buscarFilme(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', bodyParserJSON, async function(request, response){

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

router.delete('/:id', async function(request, response){

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

module.exports = router