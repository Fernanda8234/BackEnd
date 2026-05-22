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
const filmeGeneroDAO = require('../../model/DAO/filme_genero/filme_genero.js')

const inserirFilmeGenero = async function(filmeGenero){ 
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let validar = await validarDados(filmeGenero)

        if(validar){
            return validar
        } else {
            let result = await filmeGeneroDAO.insertFilmeGenero(filmeGenero)

            if(result){
                filmeGenero.id = result

                message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                message.DEFAULT_MESSAGE.response    = filmeGenero
            } else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
            return message.DEFAULT_MESSAGE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarFilmeGenero = async function(filmeGenero, id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {

            let resultBuscarID = await buscarFilmeGenero(id)

            if(resultBuscarID.status){
                let validar = await validarDados(filmeGenero)

                if(!validar){
                    filmeGenero.id = id

                    let result = await filmeGeneroDAO.updateFilmeGenero(filmeGenero)

                    if(result){

                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = filmeGenero

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

const listarFilmeGenero = async function(){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await filmeGeneroDAO.selectAllFilmeGenero()

        if(result){
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status                  = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code             = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count          = result.length // para contar a qntd
                message.DEFAULT_MESSAGE.response.filme_genero   = result //para mostrar no response

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

const buscarFilmeGenero = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(id == undefined || id == null || id == '' || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await filmeGeneroDAO.selectByIdFilmeGenero(id)

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

const buscarFilmeIdGenero = async function(idGenero){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(idGenero == undefined || idGenero == null || idGenero == '' || isNaN(idGenero)){
            message.ERROR_BAD_REQUEST.field = "[ID_GÊNERO] INVÁLIDO"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await filmeGeneroDAO.selectByFilmeIdGenero(idGenero)

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

const buscarGeneroIdFilme = async function(idFilme){
    let message = JSON.parse(JSON.strlngify(config_message))

    try {
        if(idFilme == undefined || idFilme == null || idFilme == '' || isNaN(idFilme)){
            message.ERROR_BAD_REQUEST.field = "[ID_FILME] INVÁLIDO"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await filmeGeneroDAO.selectGenerosByIdFilme(idFilme)

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

const excluirFilmeGenero = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarFilmeGenero(id)

        if(resultBuscarID.status){

            let result = await filmeGeneroDAO.deleteFilmeGenero(id)

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

const validarDados = async function(filmeGenero){
    let message = JSON.parse(JSON.stringify(config_message))

    if(filmeGenero.id_filme == undefined || filmeGenero.id_filme == '' || filmeGenero.id_filme == null || isNaN(filmeGenero.id_filme)){
        message.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // tá escrito errado
    }

    else if(filmeGenero.id_genero == undefined || filmeGenero.id_genero == '' || filmeGenero.id_genero == null || isNaN(filmeGenero.id_genero)){
        message.ERROR_BAD_REQUEST.field = '[ID_GÊNERO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // tá escrito errado
    }

    else {
        return false
    }
}

module.exports = {
    inserirFilmeGenero,
    atualizarFilmeGenero,
    listarFilmeGenero,
    buscarFilmeGenero,
    buscarFilmeIdGenero,
    buscarGeneroIdFilme,
    excluirFilmeGenero
}