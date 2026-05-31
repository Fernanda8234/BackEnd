/* ******************************************************************************
* Objetivo: Arquivo responsável pela validação, tratamento e manipulação de
*   dados para o CRUD de elenco e nome artístico
* Data: 31/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

// import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js')

// import do arquivo DAO para fazer o CRUD da relação no banco de dados
const elencoNomeArtisticoDAO = require('../../model/DAO/elenco_nome_artistico/elenco_nome_artistico.js')

const inserirElencoNomeArtistico = async function(elencoNomeArtistico){ 
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(elencoNomeArtistico)

        if(validar){
            return validar
        } else {
            let result = await elencoNomeArtisticoDAO.insertElencoNomeArtistico(elencoNomeArtistico)

            if(result){
                elencoNomeArtistico.id = result

                message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                message.DEFAULT_MESSAGE.response    = elencoNomeArtistico
            } else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
            return message.DEFAULT_MESSAGE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarElencoNomeArtistico = async function(elencoNomeArtistico, id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarElencoNomeArtistico(id)

        if(resultBuscarID.status){
            let validar = await validarDados(elencoNomeArtistico)

            if(!validar){
                elencoNomeArtistico.id = id

                let result = await elencoNomeArtisticoDAO.updateElencoNomeArtistico(elencoNomeArtistico)

                if(result){
                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = elencoNomeArtistico

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

const listarElencoNomeArtistico = async function(){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await elencoNomeArtisticoDAO.selectAllElencoNomeArtistico()

        if(result){
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status                              = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code                         = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count                      = result.length
                message.DEFAULT_MESSAGE.response.elenco_nome_artistico      = result

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

const buscarElencoNomeArtistico = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(id == undefined || id == null || id == '' || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await elencoNomeArtisticoDAO.selectByIdElencoNomeArtistico(id)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                          = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                     = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.elenco_nome_artistico  = result

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

const buscarElencoIdNomeArtistico = async function(idNomeArtistico){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(idNomeArtistico == undefined || idNomeArtistico == null || idNomeArtistico == '' || isNaN(idNomeArtistico)){
            message.ERROR_BAD_REQUEST.field = "[ID_NOME_ARTISTICO] INVÁLIDO"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await elencoNomeArtisticoDAO.selectElencoByIdNomeArtistico(idNomeArtistico)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                          = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                     = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.elenco_nome_artistico  = result

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

const buscarNomeArtisticoIdElenco = async function(idElenco){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(idElenco == undefined || idElenco == null || idElenco == '' || isNaN(idElenco)){
            message.ERROR_BAD_REQUEST.field = "[ID_ELENCO] INVÁLIDO"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await elencoNomeArtisticoDAO.selectNomesArtisticosByIdElenco(idElenco)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                          = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                     = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.elenco_nome_artistico  = result

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

const excluirElencoNomeArtistico = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarElencoNomeArtistico(id)

        if(resultBuscarID.status){

            let result = await elencoNomeArtisticoDAO.deleteElencoNomeArtistico(id)

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

// função para excluir os nomes artísticos relacionados com o elenco
const excluirNomesArtisticosIdElenco = async function(idElenco){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await elencoNomeArtisticoDAO.deleteNomesArtisticosByIdElenco(idElenco)

        if(result)
            return message.SUCCESS_DELETE_ITEM
        else
            return message.ERROR_INTERNAL_SERVER_MODEL
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER   
    }
}

const validarDados = async function(elencoNomeArtistico){
    let message = JSON.parse(JSON.stringify(config_message))

    if(elencoNomeArtistico.id_elenco == undefined || elencoNomeArtistico.id_elenco == '' || elencoNomeArtistico.id_elenco == null || isNaN(elencoNomeArtistico.id_elenco)){
        message.ERROR_BAD_REQUEST.field = '[ID_ELENCO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }

    else if(elencoNomeArtistico.id_nome_artistico == undefined || elencoNomeArtistico.id_nome_artistico == '' || elencoNomeArtistico.id_nome_artistico == null || isNaN(elencoNomeArtistico.id_nome_artistico)){
        message.ERROR_BAD_REQUEST.field = '[ID_NOME_ARTISTICO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }

    else {
        return false
    }
}

module.exports = {
    inserirElencoNomeArtistico,
    atualizarElencoNomeArtistico,
    listarElencoNomeArtistico,
    buscarElencoNomeArtistico,
    buscarElencoIdNomeArtistico,
    buscarNomeArtisticoIdElenco,
    excluirElencoNomeArtistico,
    excluirNomesArtisticosIdElenco
}