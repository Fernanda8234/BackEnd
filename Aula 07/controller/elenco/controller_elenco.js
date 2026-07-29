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
const controller_elenco_diretoria       = require('./controller_elenco_diretoria.js')
const controller_elenco_atuacao         = require('./controller_elenco_atuacao.js')
const controller_elenco_dublagem        = require('./controller_elenco_dublagem.js')
const controller_elenco_roteirizacao    = require('./controller_elenco_roteirizacao.js')
const controller_elenco_nacionalidade   = require('./controller_elenco_nacionalidade.js')
const controller_elenco_atividades      = require('./controller_elenco_atividades.js')
const controller_elenco_nome_artistico  = require('./controller_elenco_nome_artistico.js')
const controller_elenco_biografia       = require('./controller_elenco_biografia.js')

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

                            let elencoDiretoria = {"id_elenco": elenco.id,
                                                "id_diretoria": diretoria.id 
                            }
                                            
                            let resultInsertDiretoria = await controller_elenco_diretoria.inserirElencoDiretoria(elencoDiretoria)
                                // console.log(resultInsertDiretoria)
                        
                            if(!resultInsertDiretoria.status){
                                return message.SUCCESS_CREATED_ITEM_WARNIRG // 201 com alerta de dados não inseridos
                            }
                        }
                    }

                    if(elenco.atuacao){
                        for(atuacao of elenco.atuacao){

                            let elencoAtuacao = {"id_elenco": elenco.id,
                                                "id_atuacao": atuacao.id 
                            }
                                            
                            let resultInsertAtuacao = await controller_elenco_atuacao.inserirElencoAtuacao(elencoAtuacao)
                        
                            if(!resultInsertAtuacao.status){
                                return message.SUCCESS_CREATED_ITEM_WARNIRG // 201 com alerta de dados não inseridos
                            }
                        }
                    }

                    if(elenco.dublagem){
                        for(dublagem of elenco.dublagem){

                            let elencoDublagem = {"id_elenco": elenco.id,
                                                "id_dublagem": dublagem.id 
                            }
                                            
                            let resultInsertDublagem = await controller_elenco_dublagem.inserirElencoDublagem(elencoDublagem)
                        
                            if(!resultInsertDublagem.status){
                                return message.SUCCESS_CREATED_ITEM_WARNIRG // 201 com alerta de dados não inseridos
                            }
                        }
                    }

                    if(elenco.roteirizacao){
                        for(roteirizacao of elenco.roteirizacao){

                            let elencoRoteirizacao = {"id_elenco": elenco.id,
                                                "id_roteirizacao": roteirizacao.id 
                            }
                                            
                            let resultInsertRoteirizacao = await controller_elenco_roteirizacao.inserirElencoRoteirizacao(elencoRoteirizacao)
                        
                            if(!resultInsertRoteirizacao.status){
                                return message.SUCCESS_CREATED_ITEM_WARNIRG // 201 com alerta de dados não inseridos
                            }
                        }
                    }

                    if(elenco.nacionalidade){
                        for(nacionalidade of elenco.nacionalidade){

                            let elencoNacionalidade = {"id_elenco": elenco.id,
                                                "id_nacionalidade": nacionalidade.id 
                            }
                                            
                            let resultInsertNacionalidade = await controller_elenco_nacionalidade.inserirElencoNacionalidade(elencoNacionalidade)
                        
                            if(!resultInsertNacionalidade.status){
                                return message.SUCCESS_CREATED_ITEM_WARNIRG // 201 com alerta de dados não inseridos
                            }
                        }
                    }

                    if(elenco.atividades){
                        for(atividades of elenco.atividades){

                            let elencoAtividades = {"id_elenco": elenco.id,
                                                "id_atividades": atividades.id 
                            }
                                            
                            let resultInsertAtividades = await controller_elenco_atividades.inserirElencoAtividades(elencoAtividades)
                        
                            if(!resultInsertAtividades.status){
                                return message.SUCCESS_CREATED_ITEM_WARNIRG // 201 com alerta de dados não inseridos
                            }
                        }
                    }

                    if(elenco.nome_artistico){
                        for(nome_artistico of elenco.nome_artistico){

                            let elencoNomeArtistico = {"id_elenco": elenco.id,
                                                "id_nome_artistico": nome_artistico.id 
                            }
                                            
                            let resultInsertNomeArtistico = await controller_elenco_nome_artistico.inserirElencoNomeArtistico(elencoNomeArtistico)
                        
                            if(!resultInsertNomeArtistico.status){
                                return message.SUCCESS_CREATED_ITEM_WARNIRG // 201 com alerta de dados não inseridos
                            }
                        }
                    }

                    if(elenco.biografia){
                        for(biografia of elenco.biografia){

                            let elencoBiografia = {"id_elenco": elenco.id,
                                                "id_biografia": biografia.id 
                            }
                                            
                            let resultInsertBiografia = await controller_elenco_biografia.inserirElencoBiografia(elencoBiografia)
                        
                            if(!resultInsertBiografia.status){
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

                        if(elenco.diretoria){
                            let resultDeleteDiretoria = await controller_elenco_diretoria.excluirDiretoriaIdElenco(elenco.id)
                            if(resultDeleteDiretoria.status){
                                for(diretoria of elenco.diretoria){
                                                                                
                                    let elencoDiretoria = {"id_elenco": elenco.id,
                                                        "id_diretoria": diretoria.id 
                                    }
                                                                                                                    
                                    let resultInsertDiretoria = await controller_elenco_diretoria.inserirElencoDiretoria(elencoDiretoria)
                            
                                    if(!resultInsertDiretoria.status){
                                        return message.SUCCESS_CREATED_ITEM_WARNIRG // 201 com alerta de dados não inseridos
                                    }
                                }
                            }
                        }

                        if(elenco.atuacao){
                            let resultDeleteAtuacao = await controller_elenco_atuacao.excluirAtuacoesIdElenco(elenco.id)
                            if(resultDeleteAtuacao.status){
                                for(atuacao of elenco.atuacao){
                                                                                
                                    let elencoAtuacao = {"id_elenco": elenco.id,
                                                        "id_atuacao": atuacao.id 
                                    }
                                                                                                                    
                                    let resultInsertAtuacao = await controller_elenco_atuacao.inserirElencoAtuacao(elencoAtuacao)
                            
                                    if(!resultInsertAtuacao.status){
                                        return message.SUCCESS_CREATED_ITEM_WARNIRG // 201 com alerta de dados não inseridos
                                    }
                                }
                            }
                        }

                        if(elenco.dublagem){
                            let resultDeleteDublagem = await controller_elenco_dublagem.excluirDublagensIdElenco(elenco.id)
                            if(resultDeleteDublagem.status){
                                for(dublagem of elenco.dublagem){
                                                                                
                                    let elencoDublagem = {"id_elenco": elenco.id,
                                                        "id_dublagem": dublagem.id 
                                    }
                                                                                                                    
                                    let resultInsertDublagem = await controller_elenco_dublagem.inserirElencoDublagem(elencoDublagem)
                            
                                    if(!resultInsertDublagem.status){
                                        return message.SUCCESS_CREATED_ITEM_WARNIRG // 201 com alerta de dados não inseridos
                                    }
                                }
                            }
                        }

                        if(elenco.roteirizacao){
                            let resultDeleteRoteirizacao = await controller_elenco_roteirizacao.excluirRoteirizacoesIdElenco(elenco.id)
                            if(resultDeleteRoteirizacao.status){
                                for(roteirizacao of elenco.roteirizacao){
                                                                                
                                    let elencoRoteirizacao = {"id_elenco": elenco.id,
                                                        "id_roteirizacao": roteirizacao.id 
                                    }
                                                                                                                    
                                    let resultInsertRoteirizacao = await controller_elenco_roteirizacao.inserirElencoRoteirizacao(elencoRoteirizacao)
                            
                                    if(!resultInsertRoteirizacao.status){
                                        return message.SUCCESS_CREATED_ITEM_WARNIRG // 201 com alerta de dados não inseridos
                                    }
                                }
                            }
                        }

                        if(elenco.nacionalidade){
                            let resultDeleteNacionalidade = await controller_elenco_nacionalidade.excluirNacionalidadesIdElenco(elenco.id)
                            if(resultDeleteNacionalidade.status){
                                for(nacionalidade of elenco.nacionalidade){
                                                                                
                                    let elencoNacionalidade = {"id_elenco": elenco.id,
                                                        "id_nacionalidade": nacionalidade.id 
                                    }
                                                                                                                    
                                    let resultInsertNacionalidade = await controller_elenco_nacionalidade.inserirElencoNacionalidade(elencoNacionalidade)
                            
                                    if(!resultInsertNacionalidade.status){
                                        return message.SUCCESS_CREATED_ITEM_WARNIRG // 201 com alerta de dados não inseridos
                                    }
                                }
                            }
                        }

                        if(elenco.atividades){
                            let resultDeleteAtividades = await controller_elenco_atividades.excluirAtividadesIdElenco(elenco.id)
                            if(resultDeleteAtividades.status){
                                for(atividades of elenco.atividades){
                                                                                
                                    let elencoAtividades = {"id_elenco": elenco.id,
                                                        "id_atividades": atividades.id 
                                    }
                                                                                                                    
                                    let resultInsertAtividades = await controller_elenco_atividades.inserirElencoAtividades(elencoAtividades)
                            
                                    if(!resultInsertAtividades.status){
                                        return message.SUCCESS_CREATED_ITEM_WARNIRG // 201 com alerta de dados não inseridos
                                    }
                                }
                            }
                        }

                        if(elenco.nome_artistico){
                            let resultDeleteNomeArtistico = await controller_elenco_nome_artistico.excluirNomesArtisticosIdElenco(elenco.id)
                            if(resultDeleteNomeArtistico.status){
                                for(nome_artistico of elenco.nome_artistico){
                                                                                
                                    let elencoNomeArtistico = {"id_elenco": elenco.id,
                                                        "id_nome_artistico": nome_artistico.id 
                                    }
                                                                                                                    
                                    let resultInsertNomeArtistico = await controller_elenco_nome_artistico.inserirElencoNomeArtistico(elencoNomeArtistico)
                            
                                    if(!resultInsertNomeArtistico.status){
                                        return message.SUCCESS_CREATED_ITEM_WARNIRG // 201 com alerta de dados não inseridos
                                    }
                                }
                            }
                        }

                        if(elenco.biografia){
                            let resultDeleteBiografia = await controller_elenco_biografia.excluirBiografiasIdElenco(elenco.id)
                            if(resultDeleteBiografia.status){
                                for(biografia of elenco.biografia){
                                                                                
                                    let elencoBiografia = {"id_elenco": elenco.id,
                                                        "id_biografia": biografia.id 
                                    }
                                                                                                                    
                                    let resultInsertBiografia = await controller_elenco_biografia.inserirElencoBiografia(elencoBiografia)
                            
                                    if(!resultInsertBiografia.status){
                                        return message.SUCCESS_CREATED_ITEM_WARNIRG // 201 com alerta de dados não inseridos
                                    }
                                }
                            }
                        }

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

            if(result.length > 0){

                for(elenco of result){
                    let resultDiretoria = await controller_elenco_diretoria.buscarDiretoriaIdElenco(elenco.id)
                        if(resultDiretoria.status){
                            elenco.diretoria = resultDiretoria.response.elenco_diretoria 
                        }

                    let resultAtuacao = await controller_elenco_atuacao.buscarAtuacaoIdElenco(elenco.id)
                        if(resultAtuacao.status){
                            elenco.atuacao = resultAtuacao.response.elenco_atuacao
                        }

                    let resultDublagem = await controller_elenco_dublagem.buscarDublagemIdElenco(elenco.id)
                        if(resultDublagem.status){
                            elenco.dublagem = resultDublagem.response.elenco_dublagem
                        }

                    let resultRoteirizacao = await controller_elenco_roteirizacao.buscarRoteirizacaoIdElenco(elenco.id)
                        if(resultRoteirizacao.status){
                            elenco.roteirizacao = resultRoteirizacao.response.elenco_roteirizacao
                        }

                    let resultNacionalidade = await controller_elenco_nacionalidade.buscarNacionalidadeIdElenco(elenco.id)
                        if(resultNacionalidade.status){
                            elenco.nacionalidade = resultNacionalidade.response.elenco_nacionalidade
                        }

                    let resultAtividades = await controller_elenco_atividades.buscarAtividadesIdElenco(elenco.id)
                        if(resultAtividades.status){
                            elenco.atividades = resultAtividades.response.elenco_atividades
                        }
                    
                    let resultNomeArtistico = await controller_elenco_nome_artistico.buscarNomeArtisticoIdElenco(elenco.id)
                        if(resultNomeArtistico.status){
                            elenco.nome_artistico = resultNomeArtistico.response.elenco_nome_artistico
                        }

                    let resultBiografia = await controller_elenco_biografia.buscarBiografiaIdElenco(elenco.id)
                        if(resultBiografia.status){
                            elenco.biografia = resultBiografia.response.elenco_biografia
                        }
                }

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

                    for(elenco of result){
                        let resultDiretoria = await controller_elenco_diretoria.buscarDiretoriaIdElenco(elenco.id)
                            if(resultDiretoria.status){
                                elenco.diretoria = resultDiretoria.response.elenco_diretoria 
                            }

                        let resultAtuacao = await controller_elenco_atuacao.buscarAtuacaoIdElenco(elenco.id)
                            if(resultAtuacao.status){
                                elenco.atuacao = resultAtuacao.response.elenco_atuacao
                            }

                        let resultDublagem = await controller_elenco_dublagem.buscarDublagemIdElenco(elenco.id)
                            if(resultDublagem.status){
                                elenco.dublagem = resultDublagem.response.elenco_dublagem
                            }
                        
                        let resultRoteirizacao = await controller_elenco_roteirizacao.buscarRoteirizacaoIdElenco(elenco.id)
                            if(resultRoteirizacao.status){
                                elenco.roteirizacao = resultRoteirizacao.response.elenco_roteirizacao
                            }

                        let resultNacionalidade = await controller_elenco_nacionalidade.buscarNacionalidadeIdElenco(elenco.id)
                            if(resultNacionalidade.status){
                                elenco.nacionalidade = resultNacionalidade.response.elenco_nacionalidade
                            }

                        let resultAtividades = await controller_elenco_atividades.buscarAtividadesIdElenco(elenco.id)
                            if(resultAtividades.status){
                                elenco.atividades = resultAtividades.response.elenco_atividades
                            }
                        
                        let resultNomeArtistico = await controller_elenco_nome_artistico.buscarNomeArtisticoIdElenco(elenco.id)
                            if(resultNomeArtistico.status){
                                elenco.nome_artistico = resultNomeArtistico.response.elenco_nome_artistico
                            }
                        
                        let resultBiografia = await controller_elenco_biografia.buscarBiografiaIdElenco(elenco.id)
                            if(resultBiografia.status){
                                elenco.biografia = resultBiografia.response.elenco_biografia
                            }
                    }

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
            
            await controller_elenco_diretoria.excluirDiretoriaIdElenco(id)
            await controller_elenco_atuacao.excluirAtuacoesIdElenco(id)
            await controller_elenco_dublagem.excluirDublagensIdElenco(id)
            await controller_elenco_roteirizacao.excluirRoteirizacoesIdElenco(id)
            await controller_elenco_nacionalidade.excluirNacionalidadesIdElenco(id)
            await controller_elenco_atividades.excluirAtividadesIdElenco(id)
            await controller_elenco_nome_artistico.excluirNomesArtisticosIdElenco(id)
            await controller_elenco_biografia.excluirBiografiasIdElenco(id)

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
        console.log(error)
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