/********************************************************************************
* Objetivo: Arquivo responsável pela validação, tratamento e manipulação de
*   dados para o CRUD de biografia
* Data: 15/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

const config_message = require('../modulo/configMessages.js')

const biografiaDAO = require('../../model/DAO/biografia/biografia.js')

const inserirBiografia = async function(biografia, contentType){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){ 
            // se tá sendo cadastrado tem que ter algo
            let validar = await validarTexto(biografia) 
            
            if(validar){
                return validar
            } else{
                let result = await biografiaDAO.insertBiografia(biografia)
                            
                if(result){
                    biografia.id = result 
                            
                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status 
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = biografia
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

// pode atualizar para vazio (caso a pessoa não queira mais usar essa biografia)
const atualizarBiografia = async function(biografia, contentType, id){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let resultBuscarID = await buscarBiografia(id)

            if(resultBuscarID.status){ 
                    biografia.id = id 

                    let result = await biografiaDAO.updateBiografia(biografia)

                    if(result){
                        message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response    = biografia

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

const listarBiografia = async function(){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        let result = await biografiaDAO.selectAllBiografia()

        if(result){
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status              = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code         = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count      = result.length
                message.DEFAULT_MESSAGE.response.biografia  = result

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

const buscarBiografia = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(id == undefined || id == null || id == '' || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await biografiaDAO.selectByIdBiografia(id)
            
            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status              = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code         = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.biografia  = result
            
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

const excluirBiografia = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarBiografia(id)
        
        if(resultBuscarID.status){
            let result = await biografiaDAO.deleteBiografia(id)

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

const validarTexto = async function(biografia){
    let message = JSON.parse(JSON.stringify(config_message))

    if(biografia.texto == undefined || biografia.texto == null || biografia.texto == ''){
        message.ERROR_BAD_REQUEST.field = '[BIOGRAFIA] INVÁLIDA'
        return message.ERROR_BAD_REQUEST 
    } else{
        return false
    }
}


module.exports = {
    inserirBiografia,
    atualizarBiografia,
    listarBiografia,
    buscarBiografia,
    excluirBiografia
}