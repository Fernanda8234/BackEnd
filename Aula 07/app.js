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
app.post('/v1/senai/locadora/filme', bodyParserJSON, async function(request, response){
    // recebe o conteúdo dentro do body da requisição
    let dados = request.body

    let result = await controllerFilme.inserirNovoFilme(dados)

    response.status(result.status_code)
    response.json(result)
})

app.listen(8080, function(){
    console.log('API funcionando e aguardando novas requisições')
})