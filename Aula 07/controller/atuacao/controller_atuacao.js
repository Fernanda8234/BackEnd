/********************************************************************************
* Objetivo: Arquivo responsável pela validação, tratamento e manipulação de
*   dados para o CRUD de atuação
* Data: 20/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

const config_message = require('../modulo/configMessages.js')

const atuacaoDAO = require('../../model/DAO/atuacao/atuacao.js')

const inserirAtuacao = async function(atuacao, contentType){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){ 
            let validar = await validarDados(atuacao) 
            
            if(validar){
                return validar
            } else{
                let result = await atuacaoDAO.insertAtuacao(atuacao)
                            
                if(result){
                    atuacao.id = result 
                            
                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status 
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = atuacao
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

const atualizarAtuacao = async function(atuacao, contentType, id){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let resultBuscarID = await buscarAtuacao(id)

            if(resultBuscarID.status){ 
                    atuacao.id = id 

                    let result = await atuacaoDAO.updateAtuacao(atuacao)

                    if(result){
                        message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response    = atuacao

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

const listarAtuacao = async function(){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        let result = await atuacaoDAO.selectAllAtuacao()

        if(result){
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status              = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code         = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count      = result.length
                message.DEFAULT_MESSAGE.response.atuacao    = result

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

const buscarAtuacao = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(id == undefined || id == null || id == '' || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await atuacaoDAO.selectByIdAtuacao(id)
            
            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status              = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code         = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.atuacao    = result
            
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

const excluirAtuacao = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarAtuacao(id)
        
        if(resultBuscarID.status){
            let result = await atuacaoDAO.deleteAtuacao(id)

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

const validarDados = async function(atuacao){
    let message = JSON.parse(JSON.stringify(config_message))

    if(atuacao.papel_obra == undefined || atuacao.papel_obra == '' || atuacao.papel_obra == null){
        message.ERROR_BAD_REQUEST.field = '[PAPEL_OBRA] INVÁLIDA'
        return message.ERROR_BAD_REQUEST // 400

    } else if(atuacao.tipo_personagem == undefined || atuacao.tipo_personagem == '' || atuacao.tipo_personagem == null){
        message.ERROR_BAD_REQUEST.field = '[TIPO_PERSONAGEM] INVÁLIDA'
        return message.ERROR_BAD_REQUEST

    } else {
        return false
    }
}


module.exports = {
    inserirAtuacao,
    atualizarAtuacao,
    listarAtuacao,
    buscarAtuacao,
    excluirAtuacao
}