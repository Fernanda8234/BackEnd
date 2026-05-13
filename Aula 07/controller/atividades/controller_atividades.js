/********************************************************************************
* Objetivo: Arquivo responsável pela validação, tratamento e manipulação de
*   dados para o CRUD de atividades
* Data: 13/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

const config_message = require('../modulo/configMessages.js')

const atividadesDAO = require('../../model/DAO/atividade/atividade.js')

const inserirAtividades = async function(atividades, contentType){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarNome(atividades)

            if(validar){
                return validar
            } else{
                let result = await atividadesDAO.insertAtividades(atividades)
                
                    if(result){
                        atividades.id = result 
                
                        message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status 
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                        message.DEFAULT_MESSAGE.response    = atividades
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

const atualizarAtividades = async function(atividades, contentType, id){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let resultBuscarID = await buscarAtividades(id)

            if(resultBuscarID.status){
                let validar = await validarNome(atividades)
                
                if(!validar){ 
                    atividades.id = id 

                    let result = await atividadesDAO.updateAtividades(atividades)

                    if(result){
                        message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response    = atividades

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

const listarAtividades = async function(){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        let result = await atividadesDAO.selectAllAtividades()

        if(result){
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status                  = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code             = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count          = result.length
                message.DEFAULT_MESSAGE.response.atividades     = result

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

const buscarAtividades = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(id == undefined || id == null || id == '' || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await atividadesDAO.selectByIdAtividades(id)
            
            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                  = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code             = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.atividades     = result
            
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

const excluirAtividades = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarAtividades(id)
        
        if(resultBuscarID.status){
            let result = await atividadesDAO.deleteAtividades(id)

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

const validarNome = async function(atividades){
    let message = JSON.parse(JSON.stringify(config_message))

    if(atividades.nome == undefined || atividades.nome == null || atividades.nome == ''){
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    } else{
        return false
    }
}

module.exports = {
    inserirAtividades,
    atualizarAtividades,
    listarAtividades,
    buscarAtividades,
    excluirAtividades
}