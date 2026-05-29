/* ******************************************************************************
* Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de 
*   relação entre Elenco e Atuação
* Data: 29/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

// import da biblioteca para gerenciar o banco de dados Mysql no node.JS
const knex = require('knex')

// import do arquivo de configuração para conexão com o BD Mysql
const knexConfig = require('../../database_config_knew/knexFile.js')

// criar a conexão com o BD Mysql
const knexConex = knex(knexConfig.development)

const insertElenco = async function(elenco){
    try {
        let sql = `insert into tbl_elenco_ (
                    id_elenco,
                    id_
                    ) 
            values (
                    ${elenco.id_elenco},
                    ${elenco.id_}
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

const updateElenco = async function(elenco){
    try {
        let sql = `update tbl_elenco_ set
                    id_elenco = ${elenco.id_elenco},
                    id_ = ${elenco.id_}
                where id = ${elenco.id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllElenco = async function(){
    try {
        let sql = `select * from tbl_elenco_ order by id desc`

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
        let sql = `select * from tbl_elenco_ where id = ${id}`

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

// função para retornar dados do filme filtrando pelo o ID do gênero
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

// função para retornar dados dos gêneros filtrando pelo o ID do filme
const selectElencoByIdFilme = async function(idElenco){
    try {
        let sql = `select tbl_elenco.*
                        from tbl_filme
                            inner join tbl_filme_elenco
                                on tbl_filme.id = tbl_filme_elenco.id_filme 
                            inner join tbl_elenco
                                on tbl_elenco.id = tbl_filme_elenco.id_elenco
                    where tbl_filme.id = ${idElenco}`

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

// função para excluir um gênero pelo ID
const deleteFilmeElenco = async function(id){
    try {
        let sql = `delete from tbl_elenco where id = ${id};`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

/*
    função para excluir os gêneros filtrando pelo ID do filme
    essa função será utilizada no Update do filme, pois precisa
    apagar todos os gêneros relacionacionados com o filme para
    inserir as novas relações
*/
const deleteElencoByIdFilme = async function(idElenco){
    try {
        let sql = `delete from tbl_elenco_ where id_filme = ${idElenco}`

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
    insertElenco,
    updateElenco,
    selectAllElenco,
    selectByIdFilmeElenco,
    selectFilmeByIdElenco,
    selectElencoByIdFilme,
    deleteFilmeElenco,
    deleteElencoByIdFilme
}