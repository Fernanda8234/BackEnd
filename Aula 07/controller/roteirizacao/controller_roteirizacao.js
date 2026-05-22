/********************************************************************************
* Objetivo: Arquivo responsável pela validação, tratamento e manipulação de
*   dados para o CRUD de roteirização
* Data: 20/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

const config_message = require('../modulo/configMessages.js')

const roteirizacaoDAO = require('../../model/DAO/roteirizacao/roteirizacao.js')

const inserirRoteirizacao = async function(roteirizacao, contentType){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){ 
            let validar = await validarDados(roteirizacao) 
            
            if(validar){
                return validar
            } else{
                let result = await roteirizacaoDAO.insertRoteirizacao(roteirizacao)
                            
                if(result){
                    roteirizacao.id = result 
                            
                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status 
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = roteirizacao
                } else{
                    return message.ERROR_INTERNAL_SERVER_MODEL 
                }
            return message.DEFAULT_MESSAGE
            }
        } else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarRoteirizacao = async function(roteirizacao, contentType, id){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let resultBuscarID = await buscarRoteirizacao(id)

            if(resultBuscarID.status){ 
                    roteirizacao.id = id 

                    let result = await roteirizacaoDAO.updateRoteirizacao(roteirizacao)

                    if(result){
                        message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response    = roteirizacao

                        return message.DEFAULT_MESSAGE
                    } else{
                        return message.ERROR_INTERNAL_SERVER_MODEL 
                    } 
            } else{
                return resultBuscarID
            }
        } else{
            return message.ERROR_CONTENT_TYPE 
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER 
    }
}

const listarRoteirizacao = async function(){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        let result = await roteirizacaoDAO.selectAllRoteirizacao()

        if(result){
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status                  = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code             = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count          = result.length
                message.DEFAULT_MESSAGE.response.roteirizacao   = result

                return message.DEFAULT_MESSAGE 
            } else{
                return message.ERROR_NOT_FOUND 
            }
        } else{
            return message.ERROR_INTERNAL_SERVER_MODEL 
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarRoteirizacao = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(id == undefined || id == null || id == '' || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await roteirizacaoDAO.selectByIdRoteirizacao(id)
            
            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                  = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code             = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.roteirizacao   = result
            
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

const excluirRoteirizacao = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarRoteirizacao(id)
        
        if(resultBuscarID.status){
            let result = await roteirizacaoDAO.deleteRoteirizacao(id)

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

const validarDados = async function(roteirizacao){
    let message = JSON.parse(JSON.stringify(config_message))

    if(roteirizacao.estilo_narrativo == undefined || roteirizacao.estilo_narrativo == '' || roteirizacao.estilo_narrativo == null){
        message.ERROR_BAD_REQUEST.field = '[ESTILO_NARRATIVO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400

    } else if(roteirizacao.tema_recorrente == undefined || roteirizacao.tema_recorrente == '' || roteirizacao.tema_recorrente == null){
        message.ERROR_BAD_REQUEST.field = '[TEMA_RECORRENTE] INVÁLIDO'
        return message.ERROR_BAD_REQUEST

    } else {
        return false
    }
}

module.exports = {
    inserirRoteirizacao,
    atualizarRoteirizacao,
    listarRoteirizacao,
    buscarRoteirizacao,
    excluirRoteirizacao
}