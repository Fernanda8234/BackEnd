/********************************************************************************
* Objetivo: Arquivo responsável pela validação, tratamento e manipulação de
*   dados para o CRUD de diretoria
* Data: 20/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

const config_message = require('../modulo/configMessages.js')

const diretoriaDAO = require('../../model/DAO/diretoria/diretoria.js')

const inserirDiretoria = async function(diretoria, contentType){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){ 
            let validar = await validarMarcaEstilistica(diretoria) 
            
            if(validar){
                return validar
            } else{
                let result = await diretoriaDAO.insertDiretoria(diretoria)
                            
                if(result){
                    diretoria.id = result 
                            
                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status 
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = diretoria
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

const atualizarDiretoria = async function(diretoria, contentType, id){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let resultBuscarID = await buscarDiretoria(id)

            if(resultBuscarID.status){ 
                    diretoria.id = id 

                    let result = await diretoriaDAO.updateDiretoria(diretoria)

                    if(result){
                        message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response    = diretoria

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

const listarDiretoria = async function(){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        let result = await diretoriaDAO.selectAllDiretoria()

        if(result){
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status              = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code         = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count      = result.length
                message.DEFAULT_MESSAGE.response.diretoria  = result

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

const buscarDiretoria = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(id == undefined || id == null || id == '' || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await diretoriaDAO.selectByIdDiretoria(id)
            
            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status              = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code         = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.diretoria  = result
            
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

const excluirDiretoria = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarDiretoria(id)
        
        if(resultBuscarID.status){
            let result = await diretoriaDAO.deleteDiretoria(id)

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

const validarMarcaEstilistica = async function(diretoria){
    let message = JSON.parse(JSON.stringify(config_message))

    if(diretoria.marca_estilistica == undefined || diretoria.marca_estilistica == null || diretoria.marca_estilistica == ''){
        message.ERROR_BAD_REQUEST.field = '[MARCA_ESTILISTICA] INVÁLIDA'
        return message.ERROR_BAD_REQUEST // 400

    } else {
        return false
    }
}


module.exports = {
    inserirDiretoria,
    atualizarDiretoria,
    listarDiretoria,
    buscarDiretoria,
    excluirDiretoria
}