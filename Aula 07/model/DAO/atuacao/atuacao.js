/********************************************************************************
* Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de atuação
* Data: 15/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

const knex = require('knex')

const knexConfig = require('../../database_config_knew/knexFile.js')

const knexConex = knex(knexConfig.development)

const insertAtuacao = async function(atuacao){
    try {
        let sql = 
        `insert into tbl_atuacao (
            papel_obra,
            tipo_personagem
        ) 
        values (
            '${atuacao.papel_obra}',
            '${atuacao.tipo_personagem}'
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

const updateAtuacao = async function(atuacao){
    try {
        let sql = 
        `update tbl_atuacao set
            papel_obra      = '${atuacao.papel_obra}',
            tipo_personagem = '${atuacao.tipo_personagem}'
        where id            = ${atuacao.id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else 
            return false
    } catch (error) {
        return false
    }
}

const selectAllAtuacao = async function(){
    try {
        let sql = `select * from tbl_atuacao order by id desc`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdAtuacao = async function(id){
    try {
        let sql = `select * from tbl_atuacao where id = ${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteAtuacao = async function(id){
    try {
        let sql= `delete from tbl_atuacao where id = ${id}`

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
    insertAtuacao,
    updateAtuacao,
    selectAllAtuacao,
    selectByIdAtuacao,
    deleteAtuacao
}

