/* ******************************************************************************
* Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de 
*   relação entre Elenco e Roteirização
* Data: 31/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

// import da biblioteca para gerenciar o banco de dados Mysql no node.JS
const knex = require('knex')

// import do arquivo de configuração para conexão com o BD Mysql
const knexConfig = require('../../database_config_knew/knexFile.js')

// criar a conexão com o BD Mysql
const knexConex = knex(knexConfig.development)

const insertElencoRoteirizacao = async function(elencoRoteirizacao){
    try {
        let sql = `insert into tbl_elenco_roteirizacao (
                    id_elenco, 
                    id_roteirizacao
                    ) 
            values (
                    ${elencoRoteirizacao.id_elenco},
                    ${elencoRoteirizacao.id_roteirizacao}
                    )`

        let result = await knexConex.raw(sql)

        if(result)
            return result[0].insertId
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

const updateElencoRoteirizacao = async function(elencoRoteirizacao){
    try {
        let sql = `update tbl_elenco_roteirizacao set
                    id_elenco = ${elencoRoteirizacao.id_elenco},
                    id_roteirizacao = ${elencoRoteirizacao.id_roteirizacao}
                where id = ${elencoRoteirizacao.id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllElencoRoteirizacao = async function(){
    try {
        let sql = `select * from tbl_elenco_roteirizacao order by id desc`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdElencoRoteirizacao = async function(id){
    try {
        let sql = `select * from tbl_elenco_roteirizacao where id = ${id}`

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

const selectElencoByIdRoteirizacao = async function(idRoteirizacao){
    try {
        let sql = `select tbl_elenco.*
                        from tbl_elenco
                            inner join tbl_elenco_roteirizacao
                                on tbl_elenco.id = tbl_elenco_roteirizacao.id_elenco 
                            inner join tbl_roteirizacao
                                on tbl_roteirizacao.id = tbl_elenco_roteirizacao.id_roteirizacao
                    where tbl_roteirizacao.id = ${idRoteirizacao}`

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

const selectRoteirizacoesByIdElenco = async function(idElenco){
    try {
        let sql = `select tbl_roteirizacao.*
                        from tbl_elenco
                            inner join tbl_elenco_roteirizacao
                                on tbl_elenco.id = tbl_elenco_roteirizacao.id_elenco 
                            inner join tbl_roteirizacao
                                on tbl_roteirizacao.id = tbl_elenco_roteirizacao.id_roteirizacao
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

const deleteElencoRoteirizacao = async function(id){
    try {
        let sql = `delete from tbl_elenco_roteirizacao where id = ${id};`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteRoteirizacoesByIdElenco = async function(idElenco){
    try {
        let sql = `delete from tbl_elenco_roteirizacao where id_elenco = ${idElenco}`

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
    insertElencoRoteirizacao,
    updateElencoRoteirizacao,
    selectAllElencoRoteirizacao,
    selectByIdElencoRoteirizacao,
    selectElencoByIdRoteirizacao,
    selectRoteirizacoesByIdElenco,
    deleteElencoRoteirizacao,
    deleteRoteirizacoesByIdElenco
}