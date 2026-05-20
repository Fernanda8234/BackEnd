/* ******************************************************************************
* Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela diretoria
* Data: 20/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

const knex = require('knex')

const knexConfig = require('../../database_config_knew/knexFile.js')

const knexConex = knex(knexConfig.development)

const insertDiretoria = async function(diretoria){
    try {
        let sql = 
                `insert into tbl_diretoria  (
                        marca_estilistica,
                        franquias_famosas
                        )
                values  (
                        '${diretoria.marca_estilistica}',
                        if('${diretoria.franquias_famosas}' = '', null, ${diretoria.franquias_famosas})
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

const updateDiretoria = async function(diretoria){
    try {
        let sql = 
        `update tbl_diretoria set
                marca_estilistica   = '${diretoria.marca_estilistica}',
                franquias_famosas   = if('${diretoria.franquias_famosas}' = '', null, '${diretoria.franquias_famosas}')
        where id                    = ${diretoria.id}`

        let result = await knexConex.raw(sql)

        if(result) 
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllDiretoria = async function(){
    try {
        
    } catch (error) {
        return false
    }
}

const selectByIdDiretoria = async function(id){
    try {
        
    } catch (error) {
        return false
    }
}

const deleteDiretoria = async function(id){
    try {
        
    } catch (error) {
        return false
    }
}

module.exports = {
    insertDiretoria,
    updateDiretoria,
    selectAllDiretoria,
    selectByIdDiretoria,
    deleteDiretoria
}