/* *********************************************************************
* Objetivo: Arquivo responsável pela criação da API
* Data: 09/05/2026  
* Autor: Fernanda
* Versão: 1.0
***********************************************************************/

/* import das dependências para criar a API */
const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')   

/* import das CONTROLLERS do projeto */
const controllerFilme                   = require('./controller/filme/controller_filme.js')
const controllerClassificacaoIndicativa = require('./controller/classificacao_indicativa/controller_classificacao_indicativa.js')
const controllerGeneroFilme             = require('./controller/genero_filme/controller_genero_filme.js')
const controllerElencoFilme             = require('./controller/elenco/controller_elenco.js')
const controllerNacionalidade           = require('./controller/nacionalidade/controller_nacionalidade.js')
const controllerAtividades              = require('./controller/atividades/controller_atividades.js')
const controllerNomeArtistico           = require('./controller/nome_artistico/controller_nome_artistico.js')

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

// endpoint para inserir a classificação

app.post('/v1/senai/locadora/indicativa_classificacao', bodyParserJSON, async function(request, response){
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerClassificacaoIndicativa.inserirClassificacao(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/indicativa_classificacao', async function(request, response) {
    let result = await controllerClassificacaoIndicativa.listarClassificacao()

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/indicativa_classificacao/:id', async function(request, response){
    let id = request.params.id

    let result = await controllerClassificacaoIndicativa.buscarClassificacao(id)

    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/indicativa_classificacao/:id', bodyParserJSON, async function(request, response){
    let id = request.params.id

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerClassificacaoIndicativa.atualizarClassificacao(dados, contentType, id)

    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/indicativa_classificacao/:id', async function(request, response){
    let id = request.params.id

    let result = await controllerClassificacaoIndicativa.excluirClassificacao(id)

    response.status(result.status_code)
    response.json(result)
})


// endpoint para inserir os gêneros
app.post('/v1/senai/locadora/genero_filme', bodyParserJSON, async function(request, response){
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerGeneroFilme.inserirGenero(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/genero_filme', async function(request, response){
    let result = await controllerGeneroFilme.listarGenero()

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/genero_filme/:id', async function(request, response){
    let id = request.params.id

    let result = await controllerGeneroFilme.buscarGenero(id)

    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/genero_filme/:id', bodyParserJSON, async function(request, response){
    let id = request.params.id

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerGeneroFilme.atualizarGenero(dados, contentType, id)

    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/genero_filme/:id', async function(request, response){
    let id = request.params.id
    
    let result = await controllerGeneroFilme.excluirGenero(id)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para inserir o elenco
app.post('/v1/senai/locadora/elenco_filme', bodyParserJSON, async function(request, response){
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerElencoFilme.inserirElenco(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/elenco_filme', async function(request, response){
    let result = await controllerElencoFilme.listarElenco()

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/elenco_filme/:id', async function(request, response){
    let id = request.params.id

    let result = await controllerElencoFilme.buscarElenco(id)

    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/elenco_filme/:id', bodyParserJSON, async function(request, response){
    let id = request.params.id

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerElencoFilme.atualizarElenco(dados, contentType, id)

    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/elenco_filme/:id', async function(request, response){
    let id = request.params.id
    
    let result = await controllerElencoFilme.excluirElenco(id)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para inserir a nacionalidade
app.post('/v1/senai/locadora/nacionalidade', bodyParserJSON, async function(request, response){
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerNacionalidade.inserirNacionalidade(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/nacionalidade', async function(request, response){
    let result = await controllerNacionalidade.listarNacionalidade()

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/nacionalidade/:id', async function(request, response){
    let id = request.params.id

    let result = await controllerNacionalidade.buscarNacionalidade(id)
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/nacionalidade/:id', bodyParserJSON, async function(request, response){
    let id = request.params.id

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerNacionalidade.atualizarNacionalidade(dados, contentType, id)

    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/nacionalidade/:id', async function(request, response){
    let id = request.params.id
    
    let result = await controllerNacionalidade.excluirNacionalidade(id)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para atividades
app.post('/v1/senai/locadora/atividades', bodyParserJSON, async function(request, response){
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerAtividades.inserirAtividades(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/atividades', async function(request, response){
    let result = await controllerAtividades.listarAtividades()

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/atividades/:id', async function(request, response){
    let id = request.params.id

    let result = await controllerAtividades.buscarAtividades(id)
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/atividades/:id', bodyParserJSON, async function(request, response){
    let id = request.params.id

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerAtividades.atualizarAtividades(dados, contentType, id)

    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/atividades/:id', async function(request, response){
    let id = request.params.id
    
    let result = await controllerAtividades.excluirAtividades(id)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para nome artistico
app.post('/v1/senai/locadora/artistico_nome', bodyParserJSON, async function(request, response){
    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerNomeArtistico.inserirNomeArtistico(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/artistico_nome', async function(request, response){
    let result = await controllerNomeArtistico.listarNomeArtistico()

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/artistico_nome/:id', async function(request, response){
    let id = request.params.id

    let result = await controllerNomeArtistico.buscarNomeArtistico(id)
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/artistico_nome/:id', bodyParserJSON, async function(request, response){
    let id = request.params.id

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerNomeArtistico.atualizarNomeArtistico(dados, contentType, id)

    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/artistico_nome/:id', async function(request, response){
    let id = request.params.id
    
    let result = await controllerNomeArtistico.excluirNomeArtistico(id)

    response.status(result.status_code)
    response.json(result)
})

app.listen(8080, function(){
    console.log('API funcionando e aguardando novas requisições')
})