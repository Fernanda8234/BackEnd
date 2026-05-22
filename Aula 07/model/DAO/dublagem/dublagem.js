/********************************************************************************
* Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de dublagem
* Data: 20/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

const knex = require('knex')

const knexConfig = require('../../database_config_knew/knexFile.js')

const knexConex = knex(knexConfig.development)

const insertDublagem = async function(dublagem){
    try {
        let sql = 
        `insert into tbl_dublagem (personagem) 
        values('${dublagem.personagem}')`

        let result = await knexConex.raw(sql)

        if(result)
            return result[0].insertId    
         else 
            return false
    } catch (error) {
        return false
    }
}

const updateDublagem = async function(dublagem){
    try {
        let sql = 
        `update tbl_dublagem set
            personagem = '${dublagem.personagem}'
        where id = ${dublagem.id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else 
            return false
    } catch (error) {
        return false
    }
}

const selectAllDublagem = async function(){
    try {
        let sql = `select * from tbl_dublagem order by id desc`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdDublagem = async function(id){
    try {
        let sql = `select * from tbl_dublagem where id = ${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteDublagem = async function(id){
    try {
        let sql= `delete from tbl_dublagem where id = ${id}`

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
    insertDublagem,
    updateDublagem,
    selectAllDublagem,
    selectByIdDublagem,
    deleteDublagem
}