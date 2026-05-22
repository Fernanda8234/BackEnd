/********************************************************************************
* Objetivo: Arquivo responsável pela validação, tratamento e manipulação de
*   dados para o CRUD de dublagem
* Data: 20/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

const config_message = require('../modulo/configMessages.js')

const dublagemDAO = require('../../model/DAO/dublagem/dublagem.js')

const inserirDublagem = async function(dublagem, contentType){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarPersonagem(dublagem)

            if(validar){
                return validar
            } else{
                let result = await dublagemDAO.insertDublagem(dublagem)
                
                    if(result){
                        dublagem.id = result 
                
                        message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status 
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                        message.DEFAULT_MESSAGE.response    = dublagem
                    } else{
                        return message.ERROR_INTERNAL_SERVER_MODEL 
                    }
                return message.DEFAULT_MESSAGE
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarDublagem = async function(dublagem, contentType, id){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let resultBuscarID = await buscarDublagem(id)

            if(resultBuscarID.status){
                let validar = await validarPersonagem(dublagem)
                
                if(!validar){ 
                    dublagem.id = id 

                    let result = await dublagemDAO.updateDublagem(dublagem)

                    if(result){
                        message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response    = dublagem

                        return message.DEFAULT_MESSAGE
                    } else{
                        return message.ERROR_INTERNAL_SERVER_MODEL 
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
        return message.ERROR_INTERNAL_SERVER_CONTROLLER 
    }
}

const listarDublagem = async function(){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        let result = await dublagemDAO.selectAllDublagem()

        if(result){
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status              = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code         = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count      = result.length
                message.DEFAULT_MESSAGE.response.dublagem   = result

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

const buscarDublagem = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(id == undefined || id == null || id == '' || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await dublagemDAO.selectByIdDublagem(id)
            
            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status              = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code         = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.dublagem   = result
            
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

const excluirDublagem = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarDublagem(id)
        
        if(resultBuscarID.status){
            let result = await dublagemDAO.deleteDublagem(id)

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

const validarPersonagem = async function(dublagem){
    let message = JSON.parse(JSON.stringify(config_message))

    if(dublagem.personagem == undefined || dublagem.personagem == null || dublagem.personagem == ''){
        message.ERROR_BAD_REQUEST.field = '[PERSONAGEM] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    } else{
        return false
    }
}

module.exports = {
    inserirDublagem,
    atualizarDublagem,
    listarDublagem,
    buscarDublagem,
    excluirDublagem
}