/* ******************************************************************************
* Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de atividades
* Data: 13/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

const knex = require('knex')

const knexConfig = require('../../database_config_knew/knexFile.js')

const knexConex = knex(knexConfig.development)

const insertAtividades = async function(atividades){
    try {

        let sql = `insert into tbl_atividades ( nome )
                    values 	( '${atividades.nome}' )`

        let result = await knexConex.raw(sql)

        if(result)
            return result[0].insertId 
        else
            return false
    } catch (error) {
        return false
    }
}

const updateAtividades = async function(atividades){
    try {
        let sql = `
        update tbl_atividades set
            nome        = '${atividades.nome}'
        where id = ${atividades.id}`
                
        let result = await knexConex.raw(sql)
            
        if(result)
            return true
        else
            return false
        
    } catch(error) {
        return false
    }
}

// lista as classificações :>
const selectAllAtividades = async function(){
    try {
        let sql = `select * from tbl_atividades order by id desc`

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

const selectByIdAtividades = async function(id){
    try {
        let sql = `select * from tbl_atividades where id = ${id}`

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

const deleteAtividades = async function(id){
    try {
        let sql = `delete from tbl_atividades where id = ${id}` 
        
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
    insertAtividades,
    updateAtividades,
    selectAllAtividades,
    selectByIdAtividades,
    deleteAtividades
}