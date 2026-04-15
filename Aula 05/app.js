/* *********************************************************************
* Objetivo: Arquivo responsável pela criação da API do projeto de Estados e Cidades
* Data: 02/04/2026  
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

/* 
Parâmetro via Query

app.get('/v1/senai/dados/estado/', function(request, response){
->  recebe a variável UF via Query Params, que são variáveis 
        encaminhas após o simbolo de ? (?uf=sp)
->  let sigla = request.query.uf
    let estados = estadosCidades.getDadosEstados(sigla)

    response.json(estados)
    response.status(200)

    /*
    if(estados){
        response.status(200)
        response.json(estados)
    }else{
        response.status(404)
        response.json({"message": "O estado informado não foi encontrado"})
    }
*/

/* retorna os dados dos estados filtrando pelo uf */
app.get('/v1/senai/dados/estado/:uf', function(request, response){
    // recebe a variável UF através da URL separado pela /
    let sigla = request.params.uf
    let estados = estadosCidades.getDadosEstados(sigla)

    response.json(estados)
    response.status(200)

    /*
    if(estados){
        response.status(200)
        response.json(estados)
    }else{
        response.status(404)
        response.json({"message": "O estado informado não foi encontrado"})
    }
    */
})

/* retorna os dados da capital de cada estado filtrando pelo uf */
app.get('/v1/senai/capital/estado/:uf', function(request, response){
    let sigla = request.params.uf
    let capital = estadosCidades.getCapitalEstados(sigla)
    response.json(capital)
    response.status(200)
})

/* retorna os dados dos estados filtrando pela região */
app.get('/v1/senai/regiao/estado/:r', function(request, response){
    let sigla = request.params.r
    let regiao = estadosCidades.getEstadosRegiao(sigla)
    response.json(regiao)
    response.status(200)
})

/* retorna os dados dos estados que forma capitais do Brasil */
app.get('/v1/senai/estados/capital/brasil', function(request, response){
    let capital = estadosCidades.getCapitalPais()
    response.json(capital)
    response.status(200)
})

/* retorna os dados das cidades filtrando pelo uf */
app.get('/v1/senai/cidades/estados/:uf', function(request, response){
    let sigla = request.params.uf
    let cidades = estadosCidades.getCidades(sigla)
    response.json(cidades)
    response.status(200)
})

/* retorna os dados dos estados */
app.get('/v1/senai/estados', function(request, response){
    /* chama a função que retorna a lista de estados */
    let estados = estadosCidades.getListaDeEstados()
    response.json(estados)
    response.status(200)
})

app.get('/v1/senai/doc', function(request, response){ /* doc ou help */
    let docAPI = {
        "API-description": "API para manipular dados de Estados e Cidades",
        "Date": "2026-04-02",
        "Development": "Fernanda",
        "Version": "1.0",
        "EndPoints": [
            {
                "id": 1,
                "Rota 1": "/v1/senai/estados",
                "obs": "Retorna a lista de todos os estados"
            },
            {
                "id": 2,
                "Rota 2": "/v1/senai/dados/estado/sp",
                "obs": "Retorna os dados do estado filtrando pela sigla do estado"
            },
            {
                "id": 3,
                "Rota 3": "/v1/senai/capital/estado/rj",
                "obs": "Retorna os dados da capital filtrando pela sigla do estado"
            },
            {
                "id": 4,
                "Rota 4": "/v1/senai/regiao/estado/sul",
                "obs": "Retorna todos os estados filtrando pela região"
            },
            {
                "id": 5,
                "Rota 5": "/v1/senai/estados/capital/brasil",
                "obs": "Retorna todas as capitais do brasil"
            },
            {
                "id": 6,
                "Rota 6": "/v1/senai/cidades/estados/ba",
                "obs": "Retorna todas as cidades filtrando pela sigla do estado"
            }
        ]
    }
    response.status(200)
    response.json(docAPI)
})

/* serve para incializar a API para receber requisições */
app.listen(8080, function(){
    console.log('API funcionando e aguardando novas requisições')
})
/* http://localhost:8080/ */