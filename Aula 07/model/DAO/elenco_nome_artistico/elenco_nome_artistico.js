/* ******************************************************************************
* Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de 
*   relação entre Elenco e Nome Artístico
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

const insertElencoNomeArtistico = async function(elencoNomeArtistico){
    try {
        let sql = `insert into tbl_elenco_nome_artistico (
                    id_elenco, 
                    id_nome_artistico
                    ) 
            values (
                    ${elencoNomeArtistico.id_elenco},
                    ${elencoNomeArtistico.id_nome_artistico}
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

const updateElencoNomeArtistico = async function(elencoNomeArtistico){
    try {
        let sql = `update tbl_elenco_nome_artistico set
                    id_elenco = ${elencoNomeArtistico.id_elenco},
                    id_nome_artistico = ${elencoNomeArtistico.id_nome_artistico}
                where id = ${elencoNomeArtistico.id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllElencoNomeArtistico = async function(){
    try {
        let sql = `select * from tbl_elenco_nome_artistico order by id desc`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdElencoNomeArtistico = async function(id){
    try {
        let sql = `select * from tbl_elenco_nome_artistico where id = ${id}`

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

const selectElencoByIdNomeArtistico = async function(idNomeArtistico){
    try {
        let sql = `select tbl_elenco.*
                        from tbl_elenco
                            inner join tbl_elenco_nome_artistico
                                on tbl_elenco.id = tbl_elenco_nome_artistico.id_elenco 
                            inner join tbl_nome_artistico
                                on tbl_nome_artistico.id = tbl_elenco_nome_artistico.id_nome_artistico
                    where tbl_nome_artistico.id = ${idNomeArtistico}`

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

const selectNomesArtisticosByIdElenco = async function(idElenco){
    try {
        let sql = `select tbl_nome_artistico.*
                        from tbl_elenco
                            inner join tbl_elenco_nome_artistico
                                on tbl_elenco.id = tbl_elenco_nome_artistico.id_elenco 
                            inner join tbl_nome_artistico
                                on tbl_nome_artistico.id = tbl_elenco_nome_artistico.id_nome_artistico
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

const deleteElencoNomeArtistico = async function(id){
    try {
        let sql = `delete from tbl_elenco_nome_artistico where id = ${id};`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteNomesArtisticosByIdElenco = async function(idElenco){
    try {
        let sql = `delete from tbl_elenco_nome_artistico where id_elenco = ${idElenco}`

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
    insertElencoNomeArtistico,
    updateElencoNomeArtistico,
    selectAllElencoNomeArtistico,
    selectByIdElencoNomeArtistico,
    selectElencoByIdNomeArtistico,
    selectNomesArtisticosByIdElenco,
    deleteElencoNomeArtistico,
    deleteNomesArtisticosByIdElenco
}