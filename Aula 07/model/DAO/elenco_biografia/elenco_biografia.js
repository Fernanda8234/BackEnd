/* ******************************************************************************
* Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de 
*   relação entre Elenco e Biografia
* Data: 29/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knew/knexFile.js')
const knexConex = knex(knexConfig.development)

const insertElencoBiografia = async function(elencoBiografia){
    try {
        let sql = `insert into tbl_elenco_biografia (
                    id_elenco, 
                    id_biografia
                    ) 
            values (
                    ${elencoBiografia.id_elenco},
                    ${elencoBiografia.id_biografia}
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

const updateElencoBiografia = async function(elencoBiografia){
    try {
        let sql = `update tbl_elenco_biografia set
                    id_elenco = ${elencoBiografia.id_elenco},
                    id_biografia = ${elencoBiografia.id_biografia}
                where id = ${elencoBiografia.id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllElencoBiografia = async function(){
    try {
        let sql = `select * from tbl_elenco_biografia order by id desc`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdElencoBiografia = async function(id){
    try {
        let sql = `select * from tbl_elenco_biografia where id = ${id}`

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

const selectElencoByIdBiografia = async function(idBiografia){
    try {
        let sql = `select tbl_elenco.*
                        from tbl_elenco
                            inner join tbl_elenco_biografia
                                on tbl_elenco.id = tbl_elenco_biografia.id_elenco 
                            inner join tbl_biografia
                                on tbl_biografia.id = tbl_elenco_biografia.id_biografia
                    where tbl_biografia.id = ${idBiografia}`

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

const selectBiografiasByIdElenco = async function(idElenco){
    try {
        let sql = `select tbl_biografia.*
                        from tbl_elenco
                            inner join tbl_elenco_biografia
                                on tbl_elenco.id = tbl_elenco_biografia.id_elenco 
                            inner join tbl_biografia
                                on tbl_biografia.id = tbl_elenco_biografia.id_biografia
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

const deleteElencoBiografia = async function(id){
    try {
        let sql = `delete from tbl_elenco_biografia where id = ${id};`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteBiografiasByIdElenco = async function(idElenco){
    try {
        let sql = `delete from tbl_elenco_biografia where id_elenco = ${idElenco}`

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
    insertElencoBiografia,
    updateElencoBiografia,
    selectAllElencoBiografia,
    selectByIdElencoBiografia,
    selectElencoByIdBiografia,
    selectBiografiasByIdElenco,
    deleteElencoBiografia,
    deleteBiografiasByIdElenco
}