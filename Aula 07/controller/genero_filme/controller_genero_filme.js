/* ******************************************************************************
* Objetivo: Arquivo responsável pela validação, tratamento e manipulação de
*   dados para o CRUD de gêneros
* Data: 09/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

// import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js')

// import do arquivo DAO para fazer o CRUD do gênero no banco de dados
const generoDAO = require('../../model/DAO/genero_filme/genero_filme.js')

const inserirGenero = async function(genero, contentType){ 
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarNome(genero)

            if(validar){
                return validar
            }else {
                let result = await generoDAO.insertGenero(genero)

                if(result){
                    genero.id = result

                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = genero
                } else{
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }
                return message.DEFAULT_MESSAGE
            }
        } else{
            return message.ERROR_CONTENT_TYPE 
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarGenero = async function(genero, contentType, id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let resultBuscarID = await buscarGenero(id)

            if(resultBuscarID.status){
                let validar = await validarNome(genero)

                if(!validar){
                    genero.id = id

                    let result = await generoDAO.updateGenero(genero)

                    if(result){

                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = genero

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
        } else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarGenero = async function(){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await generoDAO.selectAllGenero()

        if(result){
            if(result.length > 0){
                message.DEFAULT_MESSAGE.status          = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code     = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count  = result.length // para contar a qntd
                message.DEFAULT_MESSAGE.response.genero = result //para mostrar no response

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

const buscarGenero = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(id == undefined || id == null || id == '' || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return message.ERROR_BAD_REQUEST
        } else{
            let result = await generoDAO.selectByIdGenero(id)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status          = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code     = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.genero = result

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

const excluirGenero = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarGenero(id)

        if(resultBuscarID.status){

            let result = await generoDAO.deleteGenero(id)

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

const validarNome = async function(genero) {
    let message = JSON.parse(JSON.stringify(config_message))

    if(genero.nome == undefined || genero.nome == null || genero.nome == ''){
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // tá escrito errado
    } else {
        return false
    }
}

module.exports = {
    inserirGenero,
    atualizarGenero,
    listarGenero,
    buscarGenero,
    excluirGenero
}