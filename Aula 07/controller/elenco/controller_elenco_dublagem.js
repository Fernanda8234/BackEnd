/* ******************************************************************************
* Objetivo: Arquivo responsável pela validação, tratamento e manipulação de
*   dados para o CRUD de elenco e dublagem
* Data: 29/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

const config_message = require('../modulo/configMessages.js')

const elencoDublagemDAO = require('../../model/DAO/elenco_dublagem/elenco_dublagem.js')

const inserirElencoDublagem = async function(elencoDublagem){ 
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(elencoDublagem)

        if(validar){
            return validar
        } else {
            let result = await elencoDublagemDAO.insertElencoDublagem(elencoDublagem)

            if(result){
                elencoDublagem.id = result

                message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                message.DEFAULT_MESSAGE.response    = elencoDublagem
            } else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
            return message.DEFAULT_MESSAGE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarElencoDublagem = async function(elencoDublagem, id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
            let resultBuscarID = await buscarElencoDublagem(id)

            if(resultBuscarID.status){
                let validar = await validarDados(elencoDublagem)

                if(!validar){
                    elencoDublagem.id = id

                    let result = await elencoDublagemDAO.updateElencoDublagem(elencoDublagem)

                    if(result){

                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = elencoDublagem

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
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarElencoDublagem = async function(){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await elencoDublagemDAO.selectAllElencoDublagem()

        if(result){
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status                      = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code                 = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count              = result.length
                message.DEFAULT_MESSAGE.response.elenco_dublagem    = result

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

const buscarElencoDublagem = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(id == undefined || id == null || id == '' || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await elencoDublagemDAO.selectByIdElencoDublagem(id)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                      = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                 = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.elenco_dublagem    = result

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

const buscarElencoIdDublagem = async function(idDublagem){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(idDublagem == undefined || idDublagem == null || idDublagem == '' || isNaN(idDublagem)){
            message.ERROR_BAD_REQUEST.field = "[ID_DUBLAGEM] INVÁLIDA"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await elencoDublagemDAO.selectElencoByIdDublagem(idDublagem)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                      = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                 = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.elenco_dublagem    = result

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

const buscarDublagemIdElenco = async function(idElenco){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(idElenco == undefined || idElenco == null || idElenco == '' || isNaN(idElenco)){
            message.ERROR_BAD_REQUEST.field = "[ID_ELENCO] INVÁLIDO"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await elencoDublagemDAO.selectDublagensByIdElenco(idElenco)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                      = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                 = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.elenco_dublagem    = result

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

const excluirElencoDublagem = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarElencoDublagem(id)

        if(resultBuscarID.status){

            let result = await elencoDublagemDAO.deleteElencoDublagem(id)

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

const excluirDublagensIdElenco = async function(idElenco){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await elencoDublagemDAO.deleteDublagensByIdElenco(idElenco)

        if(result)
            return message.SUCCESS_DELETE_ITEM

        else
            return message.ERROR_INTERNAL_SERVER_MODEL
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER   
    }
}

const validarDados = async function(elencoDublagem){
    let message = JSON.parse(JSON.stringify(config_message))

    if(elencoDublagem.id_elenco == undefined || elencoDublagem.id_elenco == '' || elencoDublagem.id_elenco == null || isNaN(elencoDublagem.id_elenco)){
        message.ERROR_BAD_REQUEST.field = '[ID_ELENCO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }

    else if(elencoDublagem.id_dublagem == undefined || elencoDublagem.id_dublagem == '' || elencoDublagem.id_dublagem == null || isNaN(elencoDublagem.id_dublagem)){
        message.ERROR_BAD_REQUEST.field = '[ID_DUBLAGEM] INVÁLIDA'
        return message.ERROR_BAD_REQUEST
    }

    else {
        return false
    }
}

module.exports = {
    inserirElencoDublagem,
    atualizarElencoDublagem,
    listarElencoDublagem,
    buscarElencoDublagem,
    buscarElencoIdDublagem,
    buscarDublagemIdElenco,
    excluirElencoDublagem,
    excluirDublagensIdElenco
}