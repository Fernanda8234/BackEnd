/********************************************************************************
* Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de biografia
* Data: 15/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

const knex = require('knex')

const knexConfig = require('../../database_config_knew/knexFile.js')

const knexConex = knex(knexConfig.development)

const insertBiografia = async function(biografia){
    try {
        let sql = 
        `insert into tbl_biografia (texto) 
        values('${biografia.texto}')`

        let result = await knexConex.raw(sql)

        if(result)
            return result[0].insertId    
         else 
            return false
    } catch (error) {
        return false
    }
}

const updateBiografia = async function(biografia){
    try {
        let sql = 
        `update tbl_biografia set
            texto = if('${biografia.texto}' = '', null, '${biografia.texto}')
        where id = ${biografia.id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else 
            return false
    } catch (error) {
        return false
    }
}

const selectAllBiografia = async function(){
    try {
        let sql = `select * from tbl_biografia order by id desc`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdBiografia = async function(id){
    try {
        let sql = `select * from tbl_biografia where id = ${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteBiografia = async function(id){
    try {
        let sql= `delete from tbl_biografia where id = ${id}`

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
    insertBiografia,
    updateBiografia,
    selectAllBiografia,
    selectByIdBiografia,
    deleteBiografia
}