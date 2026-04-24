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
const inserirNovoFilme = async function(filme, contentType){

    /*
        criando um clone do objeto JSON para manipular a sua 
        estrutura local sem modificar a estrutura original
    */
   
    // console.log(filme) para ver se está tudo certo

    let message = JSON.parse(JSON.stringify(config_message))   

    try {
    
        // validação paar o tipo de dados da requisição (somente JSON)
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

        // validação de dados para os atributos do Filme (Status 400)
        let validar = await validarDados(filme)

        /*
            se a função validar retornar um Json de erro
            iremos devolver ao APP o erro
        */
        if(validar){
            return validar
        } else{
            // encaminha os dados do filme para o DAO
            let result = await filmeDAO.insertFilme(filme)

            if(result){ // 201
                message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
            } else{     // 500
                return message.ERROR_INTERNAL_SERVER_MODEL
            }

            return message.DEFAULT_MESSAGE
            }
        
        } else{
            return message.ERROR_CONTENT_TYPE // 415
        }

        } catch (error) {
            return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (controller)
    }
}

// função para atualizar um filme
const atualizarFilme = async function(){
    
}

// função para retornar todos os filmes
const listarFilme = async function(){
    let message = JSON.parse(JSON.stringify(config_message)) 
    
    try {
        // chama a função do DAO para retornar a lista de todos os filmes
        let result = await filmeDAO.selectAllFilme()

        // validação para verificar se o DAO conseguiu processar os dados
        if(result){

            // validação para verificar se existe conteúdo no Array
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status          = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code     = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count  = result.length
                message.DEFAULT_MESSAGE.response.filme  = result

                return message.DEFAULT_MESSAGE // 200 (dados do filme)
            } else{
                return message.ERRO_NOT_FOUND // 404
            }

        } else{
            return message.ERROR_INTERNAL_SERVER_MODEL // 500 (model)
        }
    } catch (error) {
        // console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (controller)        
    }
}

// função para buscar um filme pelo ID
const buscarFilme = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))   

    try {
        // validação para garantir que o ID seja válido
        if(id == '' || id == null || id == undefined || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST // 400
        } else{
            let result = await filmeDAO.selectByIdFilme(id)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status          = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code     = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.filme  = result

                    return message.DEFAULT_MESSAGE // 200
                } else{
                    return message.ERRO_NOT_FOUND // 404
                } 
            } else{
                return message.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// função para excluir um filme
const excluirFilme = async function(){
    
}

/* 
    função para validar todos os dados de 
    filme (obrigatórios, qntd de caracteres, etc)
*/
const validarDados = async function(filme){
    // console.log(filme.valor.split('.')[0].length)

    // cria um clone da const message
    let message = JSON.parse(JSON.stringify(config_message))

    if(filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 80){
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400

    } else if(filme.data_lancamento == '' || filme.data_lancamento == undefined || filme.data_lancamento.length != 10){
        message.ERROR_BAD_REQUEST.field = '[DATA_LANCAMENTO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST

    } else if(filme.duracao == '' || filme.duracao == undefined || filme.duracao.length < 5){
        message.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDA'
        return message.ERROR_BAD_REQUEST

    } else if(filme.sinopse == '' || filme.sinopse == null || filme.sinopse == undefined){
        message.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDA'
        return message.ERROR_BAD_REQUEST

    } else if(isNaN(filme.avaliacao) || filme.avaliacao.split('.')[0].length > 1){
        message.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDA'
        return message.ERROR_BAD_REQUEST

    } else if(filme.valor == '' || filme.valor == null || filme.valor == undefined || filme.valor.split('.')[0].length > 3 || isNaN(filme.valor) /*||  filme.valor.split('.')[1].length > 2*/){
        message.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
        return message.ERROR_BAD_REQUEST

    } else if(filme.capa.length > 255){
        message.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDA'
        return message.ERROR_BAD_REQUEST

    } else{
        return false
    }
}

module.exports = {
    inserirNovoFilme,
    listarFilme,
    buscarFilme
}