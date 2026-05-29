/* ******************************************************************************
* Objetivo: Arquivo responsável pela validação, tratamento e manipulação de
*   dados para o CRUD de elenco e diretoria
* Data: 29/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

// import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js')

// import do arquivo DAO para fazer o CRUD do gênero no banco de dados
const elencoDiretoriaDAO = require('../../model/DAO/elenco_diretoria/elenco_diretoria.js')

const inserirElencoDiretoria = async function(elencoDiretoria){ 
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(elencoDiretoria)

        if(validar){
            return validar
        } else {
            let result = await elencoDiretoriaDAO.insertElencoDiretoria(elencoDiretoria)

            if(result){
                elencoDiretoria.id = result

                message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                message.DEFAULT_MESSAGE.response    = elencoDiretoria
            } else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
            return message.DEFAULT_MESSAGE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarElencoDiretoria = async function(elencoDiretoria, id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {

            let resultBuscarID = await buscarElencoDiretoria(id)

            if(resultBuscarID.status){
                let validar = await validarDados(elencoDiretoria)

                if(!validar){
                    elencoDiretoria.id = id

                    let result = await elencoDiretoriaDAO.updateElencoDiretoria(elencoDiretoria)

                    if(result){

                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = elencoDiretoria

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

const listarElencoDiretoria = async function(){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await elencoDiretoriaDAO.selectAllElencoDiretoria()

        if(result){
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status                      = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code                 = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count              = result.length // para contar a qntd
                message.DEFAULT_MESSAGE.response.elenco_diretoria   = result //para mostrar no response

                return message.DEFAULT_MESSAGE // para mostrar tudo
            } else{
                return message.ERROR_NOT_FOUND // não foi encontrado
            }
        } else{
            return message.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarElencoDiretoria = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(id == undefined || id == null || id == '' || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await elencoDiretoriaDAO.selectByIdElencoDiretoria(id)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                      = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                 = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.elenco_diretoria   = result

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

const buscarElencoIdDiretoria = async function(idDiretoria){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(idDiretoria == undefined || idDiretoria == null || idDiretoria == '' || isNaN(idDiretoria)){
            message.ERROR_BAD_REQUEST.field = "[ID_DIRETORIA] INVÁLIDA"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await elencoDiretoriaDAO.selectElencoByIdDiretoria(idDiretoria)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                      = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                 = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.elenco_diretoria   = result

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

const buscarDiretoriaIdElenco = async function(idElenco){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(idElenco == undefined || idElenco == null || idElenco == '' || isNaN(idElenco)){
            message.ERROR_BAD_REQUEST.field = "[ID_ELENCO] INVÁLIDO"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await elencoDiretoriaDAO.selectDiretoriasByIdElenco(idElenco)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                      = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                 = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.elenco_diretoria   = result

                    return message.DEFAULT_MESSAGE
                } else{
                    return message.ERROR_NOT_FOUND 
                } 
            } else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }    
        }
    } catch (error) {
        // console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirElencoDiretoria = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarElencoDiretoria(id)

        if(resultBuscarID.status){

            let result = await elencoDiretoriaDAO.deleteElencoDiretoria(id)

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

// função para excluir os gêneros relacionados com o filme
const excluirDiretoriaIdElenco = async function(idElenco){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await elencoDiretoriaDAO.deleteDiretoriasByIdElenco(idElenco)

        if(result)
            return message.SUCCESS_DELETE_ITEM

        else
            return message.ERROR_INTERNAL_SERVER_MODEL
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER   
    }
}

const validarDados = async function(elencoDiretoria){
    let message = JSON.parse(JSON.stringify(config_message))

    if(elencoDiretoria.id_elenco == undefined || elencoDiretoria.id_elenco == '' || elencoDiretoria.id_elenco == null || isNaN(elencoDiretoria.id_elenco)){
        message.ERROR_BAD_REQUEST.field = '[ID_ELENCO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // tá escrito errado
    }

    else if(elencoDiretoria.id_diretoria == undefined || elencoDiretoria.id_diretoria == '' || elencoDiretoria.id_diretoria == null || isNaN(elencoDiretoria.id_diretoria)){
        message.ERROR_BAD_REQUEST.field = '[ID_DIRETORIA] INVÁLIDA'
        return message.ERROR_BAD_REQUEST // tá escrito errado
    }

    else {
        return false
    }
}

module.exports = {
    inserirElencoDiretoria,
    atualizarElencoDiretoria,
    listarElencoDiretoria,
    buscarElencoDiretoria,
    buscarElencoIdDiretoria,
    buscarDiretoriaIdElenco,
    excluirElencoDiretoria,
    excluirDiretoriaIdElenco
}