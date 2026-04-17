/* ******************************************************************************
* Objetivo: Arquivo responsável pela validação, tratamento e manipulação de
*   dados para o CRUD de filmes
* Data: 17/04/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

// import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js')

// import do arquivo DAO para fazer o CRUD do filme no banco de dados
const filmeDAO = require('../../model/DAO/filme/filme.js')

// função para inserir um novo filme
const inserirNovoFilme = async function(filme){

    /*
        criando um clone do objeto JSON para manipular a sua 
        estrutura local sem modificar a estrutura original
    */
   
    let message = JSON.parse(JSON.stringify(config_message))

    // validação de dados para os atributos do Filme (Status 400)
    if(filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 80){
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        /*return message.ERROR_BAD_REQUEST // 400*/
    } else if(filme.data_lancamento == '' || filme.data_lancamento == undefined || filme.data_lancamento.length != 10){
        message.ERROR_BAD_REQUEST.field = '[DATA_LANCAMENTO] INVÁLIDO'
    } else if(filme.duracao == '' || filme.duracao == undefined || filme.duracao.length <5){
        message.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDA'
    } else if(filme.sinopse == '' || filme.sinopse == null || filme.sinopse == undefined){
        message.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDA'
    } else if(isNaN(filme.avaliacao) || filme.avaliacao.length > 3){
        message.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDA'
    } else if(filme.valor == '' || filme.valor == null || filme.valor == undefined || filme.valor.length > 5 || isNaN(filme.valor)){
        message.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
    } else if(filme.capa.length > 255){
        message.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDA'
    } else{
        let result = await filmeDAO.insertFilme(filme)

        if(result){ // 201
            message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
            message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
            message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
        } else{     // 400
            message.DEFAULT_MESSAGE.status      = message.ERROR_BAD_REQUEST.status
            message.DEFAULT_MESSAGE.status_code = message.ERROR_BAD_REQUEST.status_code
            message.DEFAULT_MESSAGE.message     = message.ERROR_BAD_REQUEST.message
            message.DEFAULT_MESSAGE.field       = message.ERROR_BAD_REQUEST.field
        }

        return message.DEFAULT_MESSAGE

    }
}

// função para atualizar um filme
const atualizarFilme = async function(){
    
}

// função para retornar todos os filmes
const listarFilme = async function(){
    
}

// função para buscar um filme pelo ID
const buscarFilme = async function(){
    
}

// função para excluir um filme
const excluirFilme = async function(){
    
}

module.exports = {
    inserirNovoFilme
}