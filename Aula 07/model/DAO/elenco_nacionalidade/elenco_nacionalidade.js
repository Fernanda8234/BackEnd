/* ******************************************************************************
* Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de 
*   relação entre Elenco e Nacionalidade
* Data: 31/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

// import da biblioteca para gerenciar o banco de dados Mysql no node.JS
const knex = require('knex')

// import do arquivo de configuração para conexão com o BD Mysql
const knexConfig = require('../../database_config_knew/knexFile.js')

// criar a conexão com o BD Mysql
const knexConex = knex(knexConfig.development)

const insertElencoNacionalidade = async function(elencoNacionalidade){
    try {
        let sql = `insert into tbl_elenco_nacionalidade (
                    id_elenco, 
                    id_nacionalidade
                    ) 
            values (
                    ${elencoNacionalidade.id_elenco},
                    ${elencoNacionalidade.id_nacionalidade}
                    )`

        let result = await knexConex.raw(sql)

        if(result)
            return result[0].insertId
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

const updateElencoNacionalidade = async function(elencoNacionalidade){
    try {
        let sql = `update tbl_elenco_nacionalidade set
                    id_elenco = ${elencoNacionalidade.id_elenco},
                    id_nacionalidade = ${elencoNacionalidade.id_nacionalidade}
                where id = ${elencoNacionalidade.id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllElencoNacionalidade = async function(){
    try {
        let sql = `select * from tbl_elenco_nacionalidade order by id desc`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdElencoNacionalidade = async function(id){
    try {
        let sql = `select * from tbl_elenco_nacionalidade where id = ${id}`

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

const selectElencoByIdNacionalidade = async function(idNacionalidade){
    try {
        let sql = `select tbl_elenco.*
                        from tbl_elenco
                            inner join tbl_elenco_nacionalidade
                                on tbl_elenco.id = tbl_elenco_nacionalidade.id_elenco 
                            inner join tbl_nacionalidade
                                on tbl_nacionalidade.id = tbl_elenco_nacionalidade.id_nacionalidade
                    where tbl_nacionalidade.id = ${idNacionalidade}`

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

const selectNacionalidadesByIdElenco = async function(idElenco){
    try {
        let sql = `select tbl_nacionalidade.*
                        from tbl_elenco
                            inner join tbl_elenco_nacionalidade
                                on tbl_elenco.id = tbl_elenco_nacionalidade.id_elenco 
                            inner join tbl_nacionalidade
                                on tbl_nacionalidade.id = tbl_elenco_nacionalidade.id_nacionalidade
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

const deleteElencoNacionalidade = async function(id){
    try {
        let sql = `delete from tbl_elenco_nacionalidade where id = ${id};`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteNacionalidadesByIdElenco = async function(idElenco){
    try {
        let sql = `delete from tbl_elenco_nacionalidade where id_elenco = ${idElenco}`

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
    insertElencoNacionalidade,
    updateElencoNacionalidade,
    selectAllElencoNacionalidade,
    selectByIdElencoNacionalidade,
    selectElencoByIdNacionalidade,
    selectNacionalidadesByIdElenco,
    deleteElencoNacionalidade,
    deleteNacionalidadesByIdElenco
}