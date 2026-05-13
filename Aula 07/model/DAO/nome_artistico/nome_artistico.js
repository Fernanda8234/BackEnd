/********************************************************************************
* Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de nome artistico
* Data: 13/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

const knex = require('knex')

const knexConfig = require('../../database_config_knew/knexFile.js')

const knexConex = knex(knexConfig.development)

const insertNomeArtistico = async function(nomeArtistico){
    try {
        let sql = 
        `insert into tbl_nome_artistico ( nome ) 
        values( '${nomeArtistico.nome}')`

        let result = await knexConex.raw(sql)

        if(result)
            return result[0].insertId    
         else 
            return false
    } catch (error) {
        return false
    }
}

const updateNomeArtistico = async function(nomeArtistico){
    try {
        let sql = 
        `update tbl_nome_artistico set
            nome = if('${nomeArtistico.nome}' = '', null, '${nomeArtistico.nome}')
        where id = ${nomeArtistico.id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else 
            return false
    } catch (error) {
        return false
    }
}

const selectAllNomeArtistico = async function(){
    try {
        let sql = `select * from tbl_nome_artistico order by id desc`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdNomeArtistico = async function(id){
    try {
        let sql = `select * from tbl_nome_artistico where id = ${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteNomeArtistico = async function(id){
    try {
        let sql= `delete from tbl_nome_artistico where id = ${id}`

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
    insertNomeArtistico,
    updateNomeArtistico,
    selectAllNomeArtistico,
    selectByIdNomeArtistico,
    deleteNomeArtistico
}