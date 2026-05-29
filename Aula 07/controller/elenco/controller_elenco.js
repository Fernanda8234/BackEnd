/********************************************************************************
* Objetivo: Arquivo responsável pela validação, tratamento e manipulação de
*   dados para o CRUD de elenco
* Data: 10/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

const config_message = require('../modulo/configMessages.js')

const elencoDAO = require('../../model/DAO/elenco/elenco.js')

// import de arquivos de Controller
const controller_elenco_diretoria = require('./controller_elenco_diretoria.js')

const inserirElenco = async function(elenco, contentType){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarDados(elenco)

            if(validar){
                return validar
            } else{
                let result = await elencoDAO.insertElenco(elenco)

                if(result){
                    elenco.id = result

                    if(elenco.diretoria){
                    for(diretoria of elenco.diretoria){

                            // cria o objeto JSON com os Ids do filme e do gênero
                            let elencoDiretoria = {"id_elenco": elenco.id,
                                                "id_diretoria": diretoria.id 
                            }
                                            
                            // chama a controller do filme_genero para inserir os Ids
                            let resultInsertDiretoria = await controller_elenco_diretoria.inserirElencoDiretoria(elencoDiretoria)
                                //console.log(resultInsertGenero)
                        
                            if(!resultInsertDiretoria.status){
                                
                                return message.SUCCESS_CREATED_ITEM_WARNIRG // 201 com alerta de dados não inseridos
                            }
                        }
                    }

                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = elenco
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

const atualizarElenco = async function(elenco, contentType, id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let resultBuscarID = await buscarElenco(id)

            if(resultBuscarID.status){
                let validar = await validarDados(elenco)

                if(!validar){               
                    elenco.id = id
                
                    let result = await elencoDAO.updateElenco(elenco)
                
                    if(result){
                        message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDATED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response    = elenco
                
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

const listarElenco = async function(){
    let message = JSON.parse(JSON.stringify(config_message))
    
    try {
        let result = await elencoDAO.selectAllElenco()

        if(result){

            for(elenco of result){
                let resultDiretoria = await controller_elenco_diretoria.buscarDiretoriaIdElenco(elenco.id)
                console.log(resultDiretoria)
                    if(resultDiretoria.status){
                        elenco.diretoria = resultDiretoria.response.elenco_diretoria 
                }
            }

            if(result.length > 0){
                message.DEFAULT_MESSAGE.status              = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code         = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count      = result.length
                message.DEFAULT_MESSAGE.response.elenco     = result

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

const buscarElenco = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if(id == undefined || id == null || id == '' || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST 
        } else{
            let result = await elencoDAO.selectByIdElenco(id)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status              = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code         = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.elenco     = result

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

const excluirElenco = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))
    
    try {
        let resultBuscarID = await buscarElenco(id)

        if(resultBuscarID.status){

            let result = await elencoDAO.deleteElenco(id)

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

const validarDados = async function(elenco){
    let message = JSON.parse(JSON.stringify(config_message))

    if(elenco.nome == undefined || elenco.nome == null || elenco.nome == ''){
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST

    } else if (elenco.data_nascimento && elenco.data_nascimento.length != 10){ // caso não tenha nada
        message.ERROR_BAD_REQUEST.field = '[DATA_NASCIMENTO] INVÁLIDA'
        return message.ERROR_BAD_REQUEST

    } else {
        return false
    }
}

module.exports = {
    inserirElenco,
    atualizarElenco,
    listarElenco,
    buscarElenco,
    excluirElenco
}