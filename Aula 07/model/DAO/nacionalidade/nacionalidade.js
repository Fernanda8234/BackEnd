/********************************************************************************
* Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de nacionalidade
* Data: 13/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

const knex = require('knex')

const knexConfig = require('../../database_config_knew/knexFile.js')

const knexConex = knex(knexConfig.development)

const insertNacionalidade = async function(nacionalidade){
    try {
        let sql = 
        `insert into tbl_nacionalidade ( nome ) 
        values( '${nacionalidade.nome}')`

        let result = await knexConex.raw(sql)

        if(result)
            return result[0].insertId    
         else 
            return false
    } catch (error) {
        return false
    }
}

const updateNacionalidade = async function(nacionalidade){
    try {
        let sql = 
        `update tbl_nacionalidade set
			nome = '${nacionalidade.nome}'
        where id = ${nacionalidade.id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else 
            return false
    } catch (error) {
        return false
    }
}

const selectAllNacionalidade = async function(){
    try {
        let sql = `select * from tbl_nacionalidade order by id desc`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdNacionalidade = async function(id){
    try {
        let sql = `select * from tbl_nacionalidade where id=${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteNacionalidade = async function(id){
    try {
        let sql= `delete from tbl_nacionalidade where id = ${id}`

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
    insertNacionalidade,
    updateNacionalidade,
    selectAllNacionalidade,
    selectByIdNacionalidade,
    deleteNacionalidade
}