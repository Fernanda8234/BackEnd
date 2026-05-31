/* ******************************************************************************
* Objetivo: Arquivo responsável pela validação, tratamento e manipulação de
*   dados para o CRUD de elenco e roteirização
* Data: 31/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

// import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js')

// import do arquivo DAO para fazer o CRUD da relação no banco de dados
const elencoRoteirizacaoDAO = require('../../model/DAO/elenco_roteirizacao/elenco_roteirizacao.js')

const inserirElencoRoteirizacao = async function(elencoRoteirizacao){ 
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(elencoRoteirizacao)

        if(validar){
            return validar
        } else {
            let result = await elencoRoteirizacaoDAO.insertElencoRoteirizacao(elencoRoteirizacao)

            if(result){
                elencoRoteirizacao.id = result

                message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                message.DEFAULT_MESSAGE.response    = elencoRoteirizacao
            } else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
            return message.DEFAULT_MESSAGE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarElencoRoteirizacao = async function(elencoRoteirizacao, id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarElencoRoteirizacao(id)

        if(resultBuscarID.status){
            let validar = await validarDados(elencoRoteirizacao)

            if(!validar){
                elencoRoteirizacao.id = id

                let result = await elencoRoteirizacaoDAO.updateElencoRoteirizacao(elencoRoteirizacao)

                if(result){
                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = elencoRoteirizacao

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

const listarElencoRoteirizacao = async function(){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await elencoRoteirizacaoDAO.selectAllElencoRoteirizacao()

        if(result){
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status                          = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code                     = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count                  = result.length
                message.DEFAULT_MESSAGE.response.elenco_roteirizacao    = result

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

const buscarElencoRoteirizacao = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(id == undefined || id == null || id == '' || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await elencoRoteirizacaoDAO.selectByIdElencoRoteirizacao(id)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                          = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                     = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.elenco_roteirizacao    = result

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

const buscarElencoIdRoteirizacao = async function(idRoteirizacao){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(idRoteirizacao == undefined || idRoteirizacao == null || idRoteirizacao == '' || isNaN(idRoteirizacao)){
            message.ERROR_BAD_REQUEST.field = "[ID_ROTEIRIZACAO] INVÁLIDA"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await elencoRoteirizacaoDAO.selectElencoByIdRoteirizacao(idRoteirizacao)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                          = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                     = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.elenco_roteirizacao    = result

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

const buscarRoteirizacaoIdElenco = async function(idElenco){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(idElenco == undefined || idElenco == null || idElenco == '' || isNaN(idElenco)){
            message.ERROR_BAD_REQUEST.field = "[ID_ELENCO] INVÁLIDO"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await elencoRoteirizacaoDAO.selectRoteirizacoesByIdElenco(idElenco)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                          = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                     = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.elenco_roteirizacao    = result

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

const excluirElencoRoteirizacao = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarElencoRoteirizacao(id)

        if(resultBuscarID.status){

            let result = await elencoRoteirizacaoDAO.deleteElencoRoteirizacao(id)

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

// função para excluir as roteirizações relacionadas com o elenco
const excluirRoteirizacoesIdElenco = async function(idElenco){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await elencoRoteirizacaoDAO.deleteRoteirizacoesByIdElenco(idElenco)

        if(result)
            return message.SUCCESS_DELETE_ITEM
        else
            return message.ERROR_INTERNAL_SERVER_MODEL
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER   
    }
}

const validarDados = async function(elencoRoteirizacao){
    let message = JSON.parse(JSON.stringify(config_message))

    if(elencoRoteirizacao.id_elenco == undefined || elencoRoteirizacao.id_elenco == '' || elencoRoteirizacao.id_elenco == null || isNaN(elencoRoteirizacao.id_elenco)){
        message.ERROR_BAD_REQUEST.field = '[ID_ELENCO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }

    else if(elencoRoteirizacao.id_roteirizacao == undefined || elencoRoteirizacao.id_roteirizacao == '' || elencoRoteirizacao.id_roteirizacao == null || isNaN(elencoRoteirizacao.id_roteirizacao)){
        message.ERROR_BAD_REQUEST.field = '[ID_ROTEIRIZACAO] INVÁLIDA'
        return message.ERROR_BAD_REQUEST
    }

    else {
        return false
    }
}

module.exports = {
    inserirElencoRoteirizacao,
    atualizarElencoRoteirizacao,
    listarElencoRoteirizacao,
    buscarElencoRoteirizacao,
    buscarElencoIdRoteirizacao,
    buscarRoteirizacaoIdElenco,
    excluirElencoRoteirizacao,
    excluirRoteirizacoesIdElenco
}