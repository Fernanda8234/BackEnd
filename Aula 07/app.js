/* *********************************************************************
* Objetivo: Endpoints por rota
* Data: 21/06/2026  
* Autor: Fernanda
* Versão: 1.1
***********************************************************************/

/* import das dependências para criar a API */
const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser') 

//criando um objeto para manipular dados do body da API em formato JSON
const bodyParserJSON = bodyParser.json()

/* criando um objeto para manipular o express */
const app = express()

/* conjuntos de permissões a serem aplicadas no CORS da API */
const corsOptions = {
    origin: ['*'], /* a origem da requisição, podendo ser um IP ou *(Todos) */ 
    methods: 'GET, POST, PUT, DELETE, OPTIONS', /* são os verbos que serão liberados na API (GET, POST, PUT, DELETE) */
    alowedHeaders: ['Content-type', 'Autorization'], /* são permissões de cabeçalho do CORS */
}

app.use(bodyParser.json())

/* configura as permissões da API através do CORS */
app.use(cors(corsOptions))

// import das rotas
const filmeRoutes                      = require('./routes/filme.routes.js')
const classificacaoIndicativaRoutes    = require('./routes/classificacao.routes.js')
const generoRoutes                     = require('./routes/genero.routes.js')
const elencoRoutes                     = require('./routes/elenco.routes.js')
const nacionalidadeRoutes              = require('./routes/nacionalidade.routes.js')
const atividadesRoutes                 = require('./routes/atividades.routes.js')
const nomeArtisticoRoutes              = require('./routes/nome_artistico.routes.js')
const biografiaRoutes                  = require('./routes/biografia.routes.js')
const direcaoRoutes                    = require('./routes/direcao.routes.js')
const atuacaoRoutes                    = require('./routes/atuacao.routes.js')
const dublagemRoutes                   = require('./routes/dublagem.routes.js')
const roteirizacaoRoutes               = require('./routes/roteirizacao.routes.js')

// endpoints
app.use('/v1/senai/locadora/filme', filmeRoutes)
app.use('/v1/senai/locadora/indicativa_classificacao', classificacaoIndicativaRoutes)
app.use('/v1/senai/locadora/genero', generoRoutes)
app.use('/v1/senai/locadora/elenco', elencoRoutes)
app.use('/v1/senai/locadora/nacionalidade', nacionalidadeRoutes)
app.use('/v1/senai/locadora/atividades', atividadesRoutes)
app.use('/v1/senai/locadora/artistico_nome', nomeArtisticoRoutes)
app.use('/v1/senai/locadora/biografia', biografiaRoutes)
app.use('/v1/senai/locadora/direcao', direcaoRoutes)
app.use('/v1/senai/locadora/atuacao', atuacaoRoutes)
app.use('/v1/senai/locadora/dublagem', dublagemRoutes)
app.use('/v1/senai/locadora/roteirizacao', roteirizacaoRoutes)

app.listen(8080, function(){
    console.log('API funcionando e aguardando novas requisições')
})