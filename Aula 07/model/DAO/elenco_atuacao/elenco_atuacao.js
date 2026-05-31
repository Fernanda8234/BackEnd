/* ******************************************************************************
* Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de 
*   relação entre Elenco e Atuação
* Data: 29/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

// import da biblioteca para gerenciar o banco de dados Mysql no node.JS
const knex = require('knex')

// import do arquivo de configuração para conexão com o BD Mysql
const knexConfig = require('../../database_config_knew/knexFile.js')

// criar a conexão com o BD Mysql
const knexConex = knex(knexConfig.development)

const insertElencoAtuacao = async function(elencoAtuacao){
    try {
        let sql = `insert into tbl_elenco_atuacao (
                    id_elenco, 
                    id_atuacao
                    ) 
            values (
                    ${elencoAtuacao.id_elenco},
                    ${elencoAtuacao.id_atuacao}
                    )`

        let result = await knexConex.raw(sql)

        if(result)
            return result[0].insertId
        else
            return false
    } catch (error) {
        return false
    }
}

const updateElencoAtuacao = async function(elencoAtuacao){
    try {
        let sql = `update tbl_elenco_atuacao set
                    id_elenco = ${elencoAtuacao.id_elenco},
                    id_atuacao = ${elencoAtuacao.id_atuacao}
                where id = ${elencoAtuacao.id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllElencoAtuacao = async function(){
    try {
        let sql = `select * from tbl_elenco_atuacao order by id desc`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdElencoAtuacao = async function(id){
    try {
        let sql = `select * from tbl_elenco_atuacao where id = ${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        } else{
            return false
        }
    } catch (error) {
        return false   
    }
}

const selectElencoByIdAtuacao = async function(idAtuacao){
    try {
        let sql = `select tbl_elenco.*
                        from tbl_elenco
                            inner join tbl_elenco_atuacao
                                on tbl_elenco.id = tbl_elenco_atuacao.id_elenco 
                            inner join tbl_atuacao
                                on tbl_atuacao.id = tbl_elenco_atuacao.id_atuacao
                    where tbl_atuacao.id = ${idAtuacao}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        } else{
            return false
        }
    } catch (error) {
        return false   
    }
}

const selectAtuacoesByIdElenco = async function(idElenco){
    try {
        let sql = `select tbl_atuacao.*
                        from tbl_elenco
                            inner join tbl_elenco_atuacao
                                on tbl_elenco.id = tbl_elenco_atuacao.id_elenco 
                            inner join tbl_atuacao
                                on tbl_atuacao.id = tbl_elenco_atuacao.id_atuacao
                    where tbl_elenco.id = ${idElenco}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        } else{
            return false
        }
    } catch (error) {
        return false   
    }
}

const deleteElencoAtuacao = async function(id){
    try {
        let sql = `delete from tbl_elenco_atuacao where id = ${id};`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteAtuacoesByIdElenco = async function(idElenco){
    try {
        let sql = `delete from tbl_elenco_atuacao where id_elenco = ${idElenco}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertElencoAtuacao,
    updateElencoAtuacao,
    selectAllElencoAtuacao,
    selectByIdElencoAtuacao,
    selectElencoByIdAtuacao,
    selectAtuacoesByIdElenco,
    deleteElencoAtuacao,
    deleteAtuacoesByIdElenco
}