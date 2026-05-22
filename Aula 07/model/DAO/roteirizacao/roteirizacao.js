/* ******************************************************************************
* Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela roteirização
* Data: 20/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

const knex = require('knex')

const knexConfig = require('../../database_config_knew/knexFile.js')

const knexConex = knex(knexConfig.development)

const insertRoteirizacao = async function(roteirizacao){
    try {
        let sql = 
                `insert into tbl_roteirizacao (
                        estilo_narrativo,
                        tema_recorrente
                        )
                values  (
                        '${roteirizacao.estilo_narrativo}',
                        '${roteirizacao.tema_recorrente}'
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

const updateRoteirizacao = async function(roteirizacao){
    try {
        let sql = 
        `update tbl_roteirizacao set
                estilo_narrativo    = '${roteirizacao.estilo_narrativo}',
                tema_recorrente     = '${roteirizacao.tema_recorrente}'
        where id                    = ${roteirizacao.id}`

        let result = await knexConex.raw(sql)

        if(result) 
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllRoteirizacao = async function(){
    try {
        let sql = `select * from tbl_roteirizacao order by id desc`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdRoteirizacao = async function(id){
    try {
        let sql = `select * from tbl_roteirizacao where id = ${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteRoteirizacao = async function(id){
    try {
        let sql= `delete from tbl_roteirizacao where id = ${id}`

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
    insertRoteirizacao,
    updateRoteirizacao,
    selectAllRoteirizacao,
    selectByIdRoteirizacao,
    deleteRoteirizacao
}