/********************************************************************************
* Objetivo: Arquivo responsável pela validação, tratamento e manipulação de
*   dados para o CRUD de nacionalidade
* Data: 13/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

const config_message = require('../modulo/configMessages.js')

const nacionalidadeDAO = require('../../model/DAO/nacionalidade/nacionalidade.js')

const inserirNacionalidade = async function(nacionalidade, contentType){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarNome(nacionalidade)

            if(validar){
                return validar
            } else{
                let result = await nacionalidadeDAO.insertNacionalidade(nacionalidade)
                
                    if(result){
                        nacionalidade.id = result 
                
                        message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status 
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                        message.DEFAULT_MESSAGE.response    = nacionalidade
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

const atualizarNacionalidade = async function(nacionalidade, contentType, id){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let resultBuscarID = await buscarNacionalidade(id)

            if(resultBuscarID.status){
                let validar = await validarNome(nacionalidade)
                
                if(!validar){ 
                    nacionalidade.id = id 

                    let result = await nacionalidadeDAO.updateNacionalidade(nacionalidade)

                    if(result){
                        message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response    = nacionalidade

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

const listarNacionalidade = async function(){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        let result = await nacionalidadeDAO.selectAllNacionalidade()

        if(result){
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status                  = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code             = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count          = result.length
                message.DEFAULT_MESSAGE.response.nacionalidade  = result

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

const buscarNacionalidade = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(id == undefined || id == null || id == '' || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await nacionalidadeDAO.selectByIdNacionalidade(id)
            
            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                  = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code             = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.nacionalidade  = result
            
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

const excluirNacionalidade = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarNacionalidade(id)
        
        if(resultBuscarID.status){
            let result = await nacionalidadeDAO.deleteNacionalidade(id)

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

const validarNome = async function(nacionalidade){
    let message = JSON.parse(JSON.stringify(config_message))

    if(nacionalidade.nome == undefined || nacionalidade.nome == null || nacionalidade.nome == ''){
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400
    } else{
        return false
    }
}

module.exports = {
    inserirNacionalidade,
    atualizarNacionalidade,
    listarNacionalidade,
    buscarNacionalidade,
    excluirNacionalidade
}