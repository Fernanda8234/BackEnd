/* ******************************************************************************
* Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de 
*   relação entre Elenco e Dublagem
* Data: 29/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knew/knexFile.js')
const knexConex = knex(knexConfig.development)

const insertElencoDublagem = async function(elencoDublagem){
    try {
        let sql = `insert into tbl_elenco_dublagem (
                    id_elenco, 
                    id_dublagem
                    ) 
            values (
                    ${elencoDublagem.id_elenco},
                    ${elencoDublagem.id_dublagem}
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

const updateElencoDublagem = async function(elencoDublagem){
    try {
        let sql = `update tbl_elenco_dublagem set
                    id_elenco = ${elencoDublagem.id_elenco},
                    id_dublagem = ${elencoDublagem.id_dublagem}
                where id = ${elencoDublagem.id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllElencoDublagem = async function(){
    try {
        let sql = `select * from tbl_elenco_dublagem order by id desc`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdElencoDublagem = async function(id){
    try {
        let sql = `select * from tbl_elenco_dublagem where id = ${id}`

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

const selectElencoByIdDublagem = async function(idDublagem){
    try {
        let sql = `select tbl_elenco.*
                        from tbl_elenco
                            inner join tbl_elenco_dublagem
                                on tbl_elenco.id = tbl_elenco_dublagem.id_elenco 
                            inner join tbl_dublagem
                                on tbl_dublagem.id = tbl_elenco_dublagem.id_dublagem
                    where tbl_dublagem.id = ${idDublagem}`

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

const selectDublagensByIdElenco = async function(idElenco){
    try {
        let sql = `select tbl_dublagem.*
                        from tbl_elenco
                            inner join tbl_elenco_dublagem
                                on tbl_elenco.id = tbl_elenco_dublagem.id_elenco 
                            inner join tbl_dublagem
                                on tbl_dublagem.id = tbl_elenco_dublagem.id_dublagem
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

const deleteElencoDublagem = async function(id){
    try {
        let sql = `delete from tbl_elenco_dublagem where id = ${id};`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteDublagensByIdElenco = async function(idElenco){
    try {
        let sql = `delete from tbl_elenco_dublagem where id_elenco = ${idElenco}`

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
    insertElencoDublagem,
    updateElencoDublagem,
    selectAllElencoDublagem,
    selectByIdElencoDublagem,
    selectElencoByIdDublagem,
    selectDublagensByIdElenco,
    deleteElencoDublagem,
    deleteDublagensByIdElenco
}