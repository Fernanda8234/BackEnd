/* ******************************************************************************
* Objetivo: Arquivo responsável pela validação, tratamento e manipulação de
*   dados para o CRUD de filme e gêneros
* Data: 22/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

// import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js')

// import do arquivo DAO para fazer o CRUD do gênero no banco de dados
const filmeElencoDAO = require('../../model/DAO/filme_elenco/filme_elenco.js')

const inserirFilmeElenco = async function(filmeElenco){ 
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(filmeElenco)

        if(validar){
            return validar
        } else {
            let result = await filmeElencoDAO.insertFilmeElenco(filmeElenco)

            if(result){
                filmeElenco.id = result

                message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                message.DEFAULT_MESSAGE.response    = filmeElenco
            } else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
            return message.DEFAULT_MESSAGE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarFilmeElenco = async function(filmeElenco, id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarFilmeElenco(id)

            if(resultBuscarID.status){
                let validar = await validarDados(filmeElenco)

                if(!validar){
                    filmeElenco.id = id

                    let result = await filmeElencoDAO.updateFilmeElenco(filmeElenco)

                    if(result){

                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = filmeElenco

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

const listarFilmeElenco = async function(){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await filmeElencoDAO.selectAllFilmeElenco()

        if(result){
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status                  = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code             = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count          = result.length // para contar a qntd
                message.DEFAULT_MESSAGE.response.filme_elenco   = result //para mostrar no response

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

const buscarFilmeElenco = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(id == undefined || id == null || id == '' || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await filmeElencoDAO.selectByIdFilmeElenco(id)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                  = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code             = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.filme_elenco   = result

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

const buscarFilmeIdElenco = async function(idElenco){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(idElenco == undefined || idElenco == null || idElenco == '' || isNaN(idElenco)){
            message.ERROR_BAD_REQUEST.field = "[ID_GÊNERO] INVÁLIDO"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await filmeElencoDAO.selectFilmeByIdElenco(idElenco)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                  = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code             = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.filme_genero   = result

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

const buscarElencoIdFilme = async function(idFilme){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(idFilme == undefined || idFilme == null || idFilme == '' || isNaN(idFilme)){
            message.ERROR_BAD_REQUEST.field = "[ID_FILME] INVÁLIDO"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await filmeElencoDAO.selectElencoByIdFilme(idFilme)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status                  = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code             = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.filme_elenco   = result

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

const excluirFilmeElenco = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarFilmeElenco(id)

        if(resultBuscarID.status){

            let result = await filmeElencoDAO.deleteFilmeElenco(id)

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
const excluirElencoIdFilme = async function(idFilme){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await filmeElencoDAO.deleteElencoByIdFilme(idFilme)

        if(result)
            return message.SUCCESS_DELETE_ITEM

        else
            return message.ERROR_INTERNAL_SERVER_MODEL
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER   
    }
}

const validarDados = async function(filmeElenco){
    let message = JSON.parse(JSON.stringify(config_message))

    if(filmeElenco.id_filme == undefined || filmeElenco.id_filme == '' || filmeElenco.id_filme == null || isNaN(filmeElenco.id_filme)){
        message.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // tá escrito errado
    }

    else if(filmeElenco.id_elenco == undefined || filmeElenco.id_elenco == '' || filmeElenco.id_elenco == null || isNaN(filmeElenco.id_elenco)){
        message.ERROR_BAD_REQUEST.field = '[ID_ELENCO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // tá escrito errado
    }

    else {
        return false
    }
}

module.exports = {
    inserirFilmeElenco,
    atualizarFilmeElenco,
    listarFilmeElenco,
    buscarFilmeElenco,
    buscarFilmeIdElenco,
    buscarElencoIdFilme,
    excluirFilmeElenco,
    excluirElencoIdFilme
}