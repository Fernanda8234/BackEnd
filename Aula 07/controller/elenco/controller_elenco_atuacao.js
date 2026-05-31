/* ******************************************************************************
* Objetivo: Arquivo responsável pela validação, tratamento e manipulação de
*   dados para o CRUD de elenco e atuação
* Data: 29/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

const config_message = require('../modulo/configMessages.js')

const elencoAtuacaoDAO = require('../../model/DAO/elenco_atuacao/elenco_atuacao.js')

const inserirElencoAtuacao = async function(elencoAtuacao){ 
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(elencoAtuacao)

        if(validar){
            return validar
        } else {
            let result = await elencoAtuacaoDAO.insertElencoAtuacao(elencoAtuacao)

            if(result){
                elencoAtuacao.id = result

                message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                message.DEFAULT_MESSAGE.response    = elencoAtuacao
            } else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
            return message.DEFAULT_MESSAGE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarElencoAtuacao = async function(elencoAtuacao, id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
            let resultBuscarID = await buscarElencoAtuacao(id)

            if(resultBuscarID.status){
                let validar = await validarDados(elencoAtuacao)

                if(!validar){
                    elencoAtuacao.id = id

                    let result = await elencoAtuacaoDAO.updateElencoAtuacao(elencoAtuacao)

                    if(result){

                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = elencoAtuacao

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

const listarElencoAtuacao = async function(){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await elencoAtuacaoDAO.selectAllElencoAtuacao()

        if(result){
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status                  = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code             = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count          = result.length
                message.DEFAULT_MESSAGE.response.elenco_atuacao = result

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

const buscarElencoAtuacao = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(id == undefined || id == null || id == '' || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await elencoAtuacaoDAO.selectByIdElencoAtuacao(id)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                  = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code             = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.elenco_atuacao = result

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

const buscarElencoIdAtuacao = async function(idAtuacao){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(idAtuacao == undefined || idAtuacao == null || idAtuacao == '' || isNaN(idAtuacao)){
            message.ERROR_BAD_REQUEST.field = "[ID_ATUACAO] INVÁLIDA"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await elencoAtuacaoDAO.selectElencoByIdAtuacao(idAtuacao)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                  = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code             = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.elenco_atuacao = result

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

const buscarAtuacaoIdElenco = async function(idElenco){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(idElenco == undefined || idElenco == null || idElenco == '' || isNaN(idElenco)){
            message.ERROR_BAD_REQUEST.field = "[ID_ELENCO] INVÁLIDO"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await elencoAtuacaoDAO.selectAtuacoesByIdElenco(idElenco)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                  = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code             = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.elenco_atuacao = result

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

const excluirElencoAtuacao = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarElencoAtuacao(id)

        if(resultBuscarID.status){

            let result = await elencoAtuacaoDAO.deleteElencoAtuacao(id)

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

const excluirAtuacoesIdElenco = async function(idElenco){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await elencoAtuacaoDAO.deleteAtuacoesByIdElenco(idElenco)

        if(result)
            return message.SUCCESS_DELETE_ITEM

        else
            return message.ERROR_INTERNAL_SERVER_MODEL
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER   
    }
}

const validarDados = async function(elencoAtuacao){
    let message = JSON.parse(JSON.stringify(config_message))

    if(elencoAtuacao.id_elenco == undefined || elencoAtuacao.id_elenco == '' || elencoAtuacao.id_elenco == null || isNaN(elencoAtuacao.id_elenco)){
        message.ERROR_BAD_REQUEST.field = '[ID_ELENCO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }

    else if(elencoAtuacao.id_atuacao == undefined || elencoAtuacao.id_atuacao == '' || elencoAtuacao.id_atuacao == null || isNaN(elencoAtuacao.id_atuacao)){
        message.ERROR_BAD_REQUEST.field = '[ID_ATUACAO] INVÁLIDA'
        return message.ERROR_BAD_REQUEST
    }

    else {
        return false
    }
}

module.exports = {
    inserirElencoAtuacao,
    atualizarElencoAtuacao,
    listarElencoAtuacao,
    buscarElencoAtuacao,
    buscarElencoIdAtuacao,
    buscarAtuacaoIdElenco,
    excluirElencoAtuacao,
    excluirAtuacoesIdElenco
}