/* ******************************************************************************
* Objetivo: Arquivo responsável pela validação, tratamento e manipulação de
*   dados para o CRUD de elenco e biografia
* Data: 29/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

const config_message = require('../modulo/configMessages.js')

const elencoBiografiaDAO = require('../../model/DAO/elenco_biografia/elenco_biografia.js')

const inserirElencoBiografia = async function(elencoBiografia){ 
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(elencoBiografia)

        if(validar){
            return validar
        } else {
            let result = await elencoBiografiaDAO.insertElencoBiografia(elencoBiografia)

            if(result){
                elencoBiografia.id = result

                message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                message.DEFAULT_MESSAGE.response    = elencoBiografia
            } else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
            return message.DEFAULT_MESSAGE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarElencoBiografia = async function(elencoBiografia, id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
            let resultBuscarID = await buscarElencoBiografia(id)

            if(resultBuscarID.status){
                let validar = await validarDados(elencoBiografia)

                if(!validar){
                    elencoBiografia.id = id

                    let result = await elencoBiografiaDAO.updateElencoBiografia(elencoBiografia)

                    if(result){

                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = elencoBiografia

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

const listarElencoBiografia = async function(){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await elencoBiografiaDAO.selectAllElencoBiografia()

        if(result){
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status                      = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code                 = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count              = result.length
                message.DEFAULT_MESSAGE.response.elenco_biografia   = result

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

const buscarElencoBiografia = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(id == undefined || id == null || id == '' || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await elencoBiografiaDAO.selectByIdElencoBiografia(id)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                      = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                 = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.elenco_biografia   = result

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

const buscarElencoIdBiografia = async function(idBiografia){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(idBiografia == undefined || idBiografia == null || idBiografia == '' || isNaN(idBiografia)){
            message.ERROR_BAD_REQUEST.field = "[ID_BIOGRAFIA] INVÁLIDA"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await elencoBiografiaDAO.selectElencoByIdBiografia(idBiografia)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                      = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                 = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.elenco_biografia   = result

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

const buscarBiografiaIdElenco = async function(idElenco){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(idElenco == undefined || idElenco == null || idElenco == '' || isNaN(idElenco)){
            message.ERROR_BAD_REQUEST.field = "[ID_ELENCO] INVÁLIDO"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await elencoBiografiaDAO.selectBiografiasByIdElenco(idElenco)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                      = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                 = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.elenco_biografia   = result

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

const excluirElencoBiografia = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarElencoBiografia(id)

        if(resultBuscarID.status){

            let result = await elencoBiografiaDAO.deleteElencoBiografia(id)

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

const excluirBiografiasIdElenco = async function(idElenco){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await elencoBiografiaDAO.deleteBiografiasByIdElenco(idElenco)

        if(result)
            return message.SUCCESS_DELETE_ITEM

        else
            return message.ERROR_INTERNAL_SERVER_MODEL
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER   
    }
}

const validarDados = async function(elencoBiografia){
    let message = JSON.parse(JSON.stringify(config_message))

    if(elencoBiografia.id_elenco == undefined || elencoBiografia.id_elenco == '' || elencoBiografia.id_elenco == null || isNaN(elencoBiografia.id_elenco)){
        message.ERROR_BAD_REQUEST.field = '[ID_ELENCO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }

    else if(elencoBiografia.id_biografia == undefined || elencoBiografia.id_biografia == '' || elencoBiografia.id_biografia == null || isNaN(elencoBiografia.id_biografia)){
        message.ERROR_BAD_REQUEST.field = '[ID_BIOGRAFIA] INVÁLIDA'
        return message.ERROR_BAD_REQUEST
    }

    else {
        return false
    }
}

module.exports = {
    inserirElencoBiografia,
    atualizarElencoBiografia,
    listarElencoBiografia,
    buscarElencoBiografia,
    buscarElencoIdBiografia,
    buscarBiografiaIdElenco,
    excluirElencoBiografia,
    excluirBiografiasIdElenco
}