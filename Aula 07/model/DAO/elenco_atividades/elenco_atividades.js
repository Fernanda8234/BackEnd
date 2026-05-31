/* ******************************************************************************
* Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de 
*   relação entre Elenco e Atividades
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

const insertElencoAtividades = async function(elencoAtividades){
    try {
        let sql = `insert into tbl_elenco_atividades (
                    id_elenco, 
                    id_atividades
                    ) 
            values (
                    ${elencoAtividades.id_elenco},
                    ${elencoAtividades.id_atividades}
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

const updateElencoAtividades = async function(elencoAtividades){
    try {
        let sql = `update tbl_elenco_atividades set
                    id_elenco = ${elencoAtividades.id_elenco},
                    id_atividades = ${elencoAtividades.id_atividades}
                where id = ${elencoAtividades.id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllElencoAtividades = async function(){
    try {
        let sql = `select * from tbl_elenco_atividades order by id desc`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdElencoAtividades = async function(id){
    try {
        let sql = `select * from tbl_elenco_atividades where id = ${id}`

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

const selectElencoByIdAtividades = async function(idAtividades){
    try {
        let sql = `select tbl_elenco.*
                        from tbl_elenco
                            inner join tbl_elenco_atividades
                                on tbl_elenco.id = tbl_elenco_atividades.id_elenco 
                            inner join tbl_atividades
                                on tbl_atividades.id = tbl_elenco_atividades.id_atividades
                    where tbl_atividades.id = ${idAtividades}`

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

const selectAtividadesByIdElenco = async function(idElenco){
    try {
        let sql = `select tbl_atividades.*
                        from tbl_elenco
                            inner join tbl_elenco_atividades
                                on tbl_elenco.id = tbl_elenco_atividades.id_elenco 
                            inner join tbl_atividades
                                on tbl_atividades.id = tbl_elenco_atividades.id_atividades
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

const deleteElencoAtividades = async function(id){
    try {
        let sql = `delete from tbl_elenco_atividades where id = ${id};`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteAtividadesByIdElenco = async function(idElenco){
    try {
        let sql = `delete from tbl_elenco_atividades where id_elenco = ${idElenco}`

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
    insertElencoAtividades,
    updateElencoAtividades,
    selectAllElencoAtividades,
    selectByIdElencoAtividades,
    selectElencoByIdAtividades,
    selectAtividadesByIdElenco,
    deleteElencoAtividades,
    deleteAtividadesByIdElenco
}