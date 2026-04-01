/* *********************************************************************
* Objetivo: Arquiv responsavél pela criação da API do projeto de Estados e Cidades
* Data: 01/04/2026  
* Autor: Fernanda
* Versão: 1.0

* Instalação do EXPRESS - npm install express --save
    dependência responsavél pela utilização do protocolo HTTP 
    para criar uma API

* Instalação do CORS    - npm install cors --save
    dependência responsavél pelas configurações a serem realizadas
    para a permissão de acesso da API
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

const estadosCidades = require('./modulo/funcoes.js')

/* criando EndPoints para a API */
app.get('/v1/senai/estados', function(request, response){
    /* chama a função que retorna a lista de estados */
    let estados = estadosCidades.getListaDeEstados()
    response.json(estados)
    response.status(200)
})

app.get('/v1/senai/dados/estado/:uf', function(request, response){
    let sigla = request.params.uf
    let estados = estadosCidades.getDadosEstados(sigla)
    response.json(estados)
    response.status(200)
})

app.get('/v1/senai/capital/estado/:uf', function(request, response){
    let sigla = request.params.uf
    let capital = estadosCidades.getCapitalEstados(sigla)
    response.json(capital)
    response.status(200)
})

app.get('/v1/senai/regiao/estado/:r', function(request, response){
    let sigla = request.params.r
    let regiao = estadosCidades.getEstadosRegiao(sigla)
    response.json(regiao)
    response.status(200)
})

app.get('/v1/senai/capital', function(request, response){
    let capital = estadosCidades.getCapitalPais()
    response.json(capital)
    response.status(200)
})

app.get('/v1/senai/cidades/:uf', function(request, response){
    let sigla = request.params.uf
    let cidades = estadosCidades.getCidades(sigla)
    response.json(cidades)
    response.status(200)
})

/* serve para incializar a API para receber requisições */
app.listen(8080, function(){
    console.log('API funcionando e aguardando novas requisições')
})
/* http://localhost:8080/ */