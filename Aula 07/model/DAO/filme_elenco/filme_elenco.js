/* ******************************************************************************
* Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de 
*   relação entre Filme e Elenco
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

const insertFilmeElenco = async function(filmeElenco){
    try {
        let sql = `insert into tbl_filme_elenco (
                    id_filme, 
                    id_elenco
                    ) 
            values (
                    ${filmeElenco.id_filme},
                    ${filmeElenco.id_elenco}
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

const updateFilmeElenco = async function(filmeElenco){
    try {
        let sql = `update tbl_filme_elenco set
                    id_filme = ${filmeElenco.id_filme},
                    id_elenco = ${filmeElenco.id_elenco}
                where id = ${filmeElenco.id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllFilmeElenco = async function(){
    try {
        let sql = `select * from tbl_filme_elenco order by id desc`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdFilmeElenco = async function(id){
    try {
        let sql = `select * from tbl_filme_elenco where id = ${id}`

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

const selectFilmeByIdElenco = async function(idElenco){
    try {
        let sql = `select tbl_filme.*
                        from tbl_filme
                            inner join tbl_filme_elenco
                                on tbl_filme.id = tbl_filme_elenco.id_filme 
                            inner join tbl_elenco
                                on tbl_elenco.id = tbl_filme_elenco.id_elenco
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

const selectElencoByIdFilme = async function(idFilme){
    try {
        let sql = `select tbl_elenco.*
                        from tbl_filme
                            inner join tbl_filme_elenco
                                on tbl_filme.id = tbl_filme_elenco.id_filme 
                            inner join tbl_elenco
                                on tbl_elenco.id = tbl_filme_elenco.id_elenco
                    where tbl_filme.id = ${idFilme}`

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

const deleteFilmeElenco = async function(id){
    try {
        let sql = `delete from tbl_filme_elenco where id = ${id};`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteElencoByIdFilme = async function(idFilme){
    try {
        let sql = `delete from tbl_filme_elenco where id_filme = ${idFilme}`

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
    insertFilmeElenco,
    updateFilmeElenco,
    selectAllFilmeElenco,
    selectByIdFilmeElenco,
    selectFilmeByIdElenco,
    selectElencoByIdFilme,
    deleteFilmeElenco,
    deleteElencoByIdFilme
}