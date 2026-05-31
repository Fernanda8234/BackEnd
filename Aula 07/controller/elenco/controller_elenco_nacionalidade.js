/* ******************************************************************************
* Objetivo: Arquivo responsável pela validação, tratamento e manipulação de
*   dados para o CRUD de elenco e nacionalidade
* Data: 31/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

// import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js')

// import do arquivo DAO para fazer o CRUD da relação no banco de dados
const elencoNacionalidadeDAO = require('../../model/DAO/elenco_nacionalidade/elenco_nacionalidade.js')

const inserirElencoNacionalidade = async function(elencoNacionalidade){ 
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(elencoNacionalidade)

        if(validar){
            return validar
        } else {
            let result = await elencoNacionalidadeDAO.insertElencoNacionalidade(elencoNacionalidade)

            if(result){
                elencoNacionalidade.id = result

                message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                message.DEFAULT_MESSAGE.response    = elencoNacionalidade
            } else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
            return message.DEFAULT_MESSAGE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarElencoNacionalidade = async function(elencoNacionalidade, id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarElencoNacionalidade(id)

        if(resultBuscarID.status){
            let validar = await validarDados(elencoNacionalidade)

            if(!validar){
                elencoNacionalidade.id = id

                let result = await elencoNacionalidadeDAO.updateElencoNacionalidade(elencoNacionalidade)

                if(result){
                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = elencoNacionalidade

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

const listarElencoNacionalidade = async function(){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await elencoNacionalidadeDAO.selectAllElencoNacionalidade()

        if(result){
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status                          = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code                     = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count                  = result.length
                message.DEFAULT_MESSAGE.response.elenco_nacionalidade   = result

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

const buscarElencoNacionalidade = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(id == undefined || id == null || id == '' || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await elencoNacionalidadeDAO.selectByIdElencoNacionalidade(id)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                          = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                     = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.elenco_nacionalidade   = result

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

const buscarElencoIdNacionalidade = async function(idNacionalidade){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(idNacionalidade == undefined || idNacionalidade == null || idNacionalidade == '' || isNaN(idNacionalidade)){
            message.ERROR_BAD_REQUEST.field = "[ID_NACIONALIDADE] INVÁLIDA"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await elencoNacionalidadeDAO.selectElencoByIdNacionalidade(idNacionalidade)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                          = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                     = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.elenco_nacionalidade   = result

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

const buscarNacionalidadeIdElenco = async function(idElenco){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(idElenco == undefined || idElenco == null || idElenco == '' || isNaN(idElenco)){
            message.ERROR_BAD_REQUEST.field = "[ID_ELENCO] INVÁLIDO"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await elencoNacionalidadeDAO.selectNacionalidadesByIdElenco(idElenco)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                          = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                     = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.elenco_nacionalidade   = result

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

const excluirElencoNacionalidade = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarElencoNacionalidade(id)

        if(resultBuscarID.status){

            let result = await elencoNacionalidadeDAO.deleteElencoNacionalidade(id)

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

// função para excluir as nacionalidades relacionadas com o elenco
const excluirNacionalidadesIdElenco = async function(idElenco){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await elencoNacionalidadeDAO.deleteNacionalidadesByIdElenco(idElenco)

        if(result)
            return message.SUCCESS_DELETE_ITEM
        else
            return message.ERROR_INTERNAL_SERVER_MODEL
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER   
    }
}

const validarDados = async function(elencoNacionalidade){
    let message = JSON.parse(JSON.stringify(config_message))

    if(elencoNacionalidade.id_elenco == undefined || elencoNacionalidade.id_elenco == '' || elencoNacionalidade.id_elenco == null || isNaN(elencoNacionalidade.id_elenco)){
        message.ERROR_BAD_REQUEST.field = '[ID_ELENCO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }

    else if(elencoNacionalidade.id_nacionalidade == undefined || elencoNacionalidade.id_nacionalidade == '' || elencoNacionalidade.id_nacionalidade == null || isNaN(elencoNacionalidade.id_nacionalidade)){
        message.ERROR_BAD_REQUEST.field = '[ID_NACIONALIDADE] INVÁLIDA'
        return message.ERROR_BAD_REQUEST
    }

    else {
        return false
    }
}

module.exports = {
    inserirElencoNacionalidade,
    atualizarElencoNacionalidade,
    listarElencoNacionalidade,
    buscarElencoNacionalidade,
    buscarElencoIdNacionalidade,
    buscarNacionalidadeIdElenco,
    excluirElencoNacionalidade,
    excluirNacionalidadesIdElenco
}