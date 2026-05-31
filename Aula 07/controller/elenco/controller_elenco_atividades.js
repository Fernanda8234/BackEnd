/* ******************************************************************************
* Objetivo: Arquivo responsável pela validação, tratamento e manipulação de
*   dados para o CRUD de elenco e atividades
* Data: 31/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

// import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js')

// import do arquivo DAO para fazer o CRUD da relação no banco de dados
const elencoAtividadesDAO = require('../../model/DAO/elenco_atividades/elenco_atividades.js')

const inserirElencoAtividades = async function(elencoAtividades){ 
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(elencoAtividades)

        if(validar){
            return validar
        } else {
            let result = await elencoAtividadesDAO.insertElencoAtividades(elencoAtividades)

            if(result){
                elencoAtividades.id = result

                message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                message.DEFAULT_MESSAGE.response    = elencoAtividades
            } else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
            return message.DEFAULT_MESSAGE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarElencoAtividades = async function(elencoAtividades, id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarElencoAtividades(id)

        if(resultBuscarID.status){
            let validar = await validarDados(elencoAtividades)

            if(!validar){
                elencoAtividades.id = id

                let result = await elencoAtividadesDAO.updateElencoAtividades(elencoAtividades)

                if(result){
                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = elencoAtividades

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

const listarElencoAtividades = async function(){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await elencoAtividadesDAO.selectAllElencoAtividades()

        if(result){
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status                      = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code                 = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count              = result.length
                message.DEFAULT_MESSAGE.response.elenco_atividades  = result

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

const buscarElencoAtividades = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(id == undefined || id == null || id == '' || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await elencoAtividadesDAO.selectByIdElencoAtividades(id)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                      = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                 = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.elenco_atividades  = result

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

const buscarElencoIdAtividades = async function(idAtividades){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(idAtividades == undefined || idAtividades == null || idAtividades == '' || isNaN(idAtividades)){
            message.ERROR_BAD_REQUEST.field = "[ID_ATIVIDADES] INVÁLIDO"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await elencoAtividadesDAO.selectElencoByIdAtividades(idAtividades)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                      = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                 = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.elenco_atividades  = result

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

const buscarAtividadesIdElenco = async function(idElenco){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(idElenco == undefined || idElenco == null || idElenco == '' || isNaN(idElenco)){
            message.ERROR_BAD_REQUEST.field = "[ID_ELENCO] INVÁLIDO"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await elencoAtividadesDAO.selectAtividadesByIdElenco(idElenco)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                      = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                 = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.elenco_atividades  = result

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

const excluirElencoAtividades = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarElencoAtividades(id)

        if(resultBuscarID.status){

            let result = await elencoAtividadesDAO.deleteElencoAtividades(id)

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

// função para excluir as atividades relacionadas com o elenco
const excluirAtividadesIdElenco = async function(idElenco){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await elencoAtividadesDAO.deleteAtividadesByIdElenco(idElenco)

        if(result)
            return message.SUCCESS_DELETE_ITEM
        else
            return message.ERROR_INTERNAL_SERVER_MODEL
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER   
    }
}

const validarDados = async function(elencoAtividades){
    let message = JSON.parse(JSON.stringify(config_message))

    if(elencoAtividades.id_elenco == undefined || elencoAtividades.id_elenco == '' || elencoAtividades.id_elenco == null || isNaN(elencoAtividades.id_elenco)){
        message.ERROR_BAD_REQUEST.field = '[ID_ELENCO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }

    else if(elencoAtividades.id_atividades == undefined || elencoAtividades.id_atividades == '' || elencoAtividades.id_atividades == null || isNaN(elencoAtividades.id_atividades)){
        message.ERROR_BAD_REQUEST.field = '[ID_ATIVIDADES] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }

    else {
        return false
    }
}

module.exports = {
    inserirElencoAtividades,
    atualizarElencoAtividades,
    listarElencoAtividades,
    buscarElencoAtividades,
    buscarElencoIdAtividades,
    buscarAtividadesIdElenco,
    excluirElencoAtividades,
    excluirAtividadesIdElenco
}