/* ******************************************************************************
* Objetivo: Arquivo responsável pela validação, tratamento e manipulação de
*   dados para o CRUD de classificação indicativa
* Data: 08/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

// import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js')

// import do arquivo DAO para fazer o CRUD da classificacao indicativa no banco de dados
const classificacaoDAO = require('../../model/DAO/classificacao_indicativa/classificacao_indicativa.js')

const inserirClassificacao = async function(classificacao, contentType){

    let message = JSON.parse(JSON.stringify(config_message)) 

    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){ // apenas json :p
            let validar = await validarDados(classificacao)

            if(validar){ // valida os dados antes de tudo
                return validar
            } else{
            
                let result = await classificacaoDAO.insertClassificacaoIndicativa(classificacao)

                if(result){
                    classificacao.id = result // cria o id após inserir a classificação

                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status // criado
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response = classificacao
                } else{
                    return message.ERROR_INTERNAL_SERVER_MODEL // erro na model :p
                }
            return message.DEFAULT_MESSAGE
            }
        } else{
            return message.ERROR_CONTENT_TYPE 
        }
    } catch(error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // tem algo de errado aqui po
    }
}

const atualizarClassificacao = async function(classificacao, contentType, id){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let resultBuscarID = await buscarClassificacao(id) // pelo id

            if(resultBuscarID.status){
                let validar = await validarDados(classificacao) // validação :p

                if(!validar){ // para ser obrigatória

                    classificacao.id = id // pra ir pro dao da classificação

                    let result = await classificacaoDAO.updateClassificacao(classificacao)

                    if(result){
                        message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response    = classificacao

                        return message.DEFAULT_MESSAGE
                    } else{
                        return message.ERROR_INTERNAL_SERVER_MODEL // erro na model :p
                    } 
                } else{
                    return validar
                }
            } else{
                return resultBuscarID
            }
        } else{
            return message.ERROR_CONTENT_TYPE 
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // tem algo de errado aqui po
    }
}

const listarClassificacao = async function(){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        let result = await classificacaoDAO.selectAllClassificacao()

        if(result){

            // validação para verificar se existe conteúdo no Array
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status          = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code     = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count  = result.length
                message.DEFAULT_MESSAGE.response.classificacao  = result

                return message.DEFAULT_MESSAGE // mostra tudo
            } else{
                return message.ERROR_NOT_FOUND // não encontrado
            }

        } else{
            return message.ERROR_INTERNAL_SERVER_MODEL // erro na model :P
        }
        
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // tem algo de errado aqui po
    }
}

const buscarClassificacao = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        if(id == undefined || id == null || id == '' || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await classificacaoDAO.selectByIdClassificacao(id)
    
            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status          = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code     = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.classificacao  = result
    
                    return message.DEFAULT_MESSAGE 
                } else{
                    return message.ERROR_NOT_FOUND 
                } 
            } else{
                return message.ERROR_INTERNAL_SERVER_MODEL 
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER 
    }
}

const excluirClassificacao = async function(id){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        let resultBuscarID = await buscarClassificacao(id)
        
            if(resultBuscarID.status){
        
                let result = await classificacaoDAO.deleteClassificacao(id)
        
                    if(result){
                        message.DEFAULT_MESSAGE.status      = message.SUCCESS_DELETE_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_DELETE_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCCESS_DELETE_ITEM.message
        
                        return message.DEFAULT_MESSAGE
                } else{
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }
            } else{
            return resultBuscarID 
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER 
    }
}

const validarDados = async function(classificacao){
    let message = JSON.parse(JSON.stringify(config_message))

    if(classificacao.codigo == undefined || classificacao.codigo == null || classificacao.codigo == ''){
        message.ERROR_BAD_REQUEST.field = '[CÓDIGO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // tá escrito errado
    
    } else if(classificacao.nome == undefined || classificacao.nome == null || classificacao.nome == ''){
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // tá escrito errado
    
    } else if(classificacao.descricao == undefined || classificacao.descricao == null || classificacao.descricao == ''){
        message.ERROR_BAD_REQUEST.field = '[DESCRIÇÃO] INVÁLIDA'
        return message.ERROR_BAD_REQUEST // tá escrito errado

    } else{
        return false
    }
}

module.exports = {
    inserirClassificacao,
    atualizarClassificacao,
    listarClassificacao,
    buscarClassificacao,
    excluirClassificacao
}