/********************************************************************************
* Objetivo: Arquivo responsável pela validação, tratamento e manipulação de
*   dados para o CRUD de nome artistico
* Data: 13/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

const config_message = require('../modulo/configMessages.js')

const nomeArtisticoDAO = require('../../model/DAO/nome_artistico/nome_artistico.js')

const inserirNomeArtistico = async function(nomeArtistico, contentType){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){ 
            // se tá sendo cadastrado tem que ter algo
            let validar = await validarNome(nomeArtistico) 
            
            if(validar){
                return validar
            } else{
                let result = await nomeArtisticoDAO.insertNomeArtistico(nomeArtistico)
                            
                if(result){
                    nomeArtistico.id = result 
                            
                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status 
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = nomeArtistico
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

// pode atualizar para vazio (caso a pessoa não queira mais usar um nome artistico)
const atualizarNomeArtistico = async function(nomeArtistico, contentType, id){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let resultBuscarID = await buscarNomeArtistico(id)

            if(resultBuscarID.status){ 
                    nomeArtistico.id = id 

                    let result = await nomeArtisticoDAO.updateNomeArtistico(nomeArtistico)

                    if(result){
                        message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response    = nomeArtistico

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

const listarNomeArtistico = async function(){
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        let result = await nomeArtisticoDAO.selectAllNomeArtistico()

        if(result){
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status                      = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code                 = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count              = result.length
                message.DEFAULT_MESSAGE.response.nome_artistico     = result

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

const buscarNomeArtistico = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(id == undefined || id == null || id == '' || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await nomeArtisticoDAO.selectByIdNomeArtistico(id)
            
            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                      = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                 = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.nome_artistico     = result
            
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

const excluirNomeArtistico = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarNomeArtistico(id)
        
        if(resultBuscarID.status){
            let result = await nomeArtisticoDAO.deleteNomeArtistico(id)

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

const validarNome = async function(nomeArtistico){
    let message = JSON.parse(JSON.stringify(config_message))

    if(nomeArtistico.nome == undefined || nomeArtistico.nome == null || nomeArtistico.nome == ''){
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST 
    } else{
        return false
    }
}


module.exports = {
    inserirNomeArtistico,
    atualizarNomeArtistico,
    listarNomeArtistico,
    buscarNomeArtistico,
    excluirNomeArtistico
}