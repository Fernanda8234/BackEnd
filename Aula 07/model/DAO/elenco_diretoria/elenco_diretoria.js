/* ******************************************************************************
* Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de 
*   relação entre Elenco e Diretoria
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

const insertElencoDiretoria = async function(elencoDiretoria){
    try {
        let sql = `insert into tbl_elenco_diretoria (
                    id_elenco, 
                    id_diretoria
                    ) 
            values (
                    ${elencoDiretoria.id_elenco},
                    ${elencoDiretoria.id_diretoria}
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

const updateElencoDiretoria = async function(elencoDiretoria){
    try {
        let sql = `update tbl_elenco_diretoria set
                    id_elenco = ${elencoDiretoria.id_elenco},
                    id_diretoria = ${elencoDiretoria.id_diretoria}
                where id = ${elencoDiretoria.id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllElencoDiretoria = async function(){
    try {
        let sql = `select * from tbl_elenco_diretoria order by id desc`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdElencoDiretoria = async function(id){
    try {
        let sql = `select * from tbl_elenco_diretoria where id = ${id}`

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
const selectElencoByIdDiretoria = async function(idDiretoria){
    try {
        let sql = `select tbl_elenco.*
                        from tbl_elenco
                            inner join tbl_elenco_diretoria
                                on tbl_elenco.id = tbl_elenco_diretoria.id_elenco 
                            inner join tbl_diretoria
                                on tbl_diretoria.id = tbl_elenco_diretoria.id_diretoria
                    where tbl_diretoria.id = ${idDiretoria}`

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
const selectDiretoriasByIdElenco = async function(idElenco){
    try {
        let sql = `select tbl_diretoria.*
                        from tbl_elenco
                            inner join tbl_elenco_diretoria
                                on tbl_elenco.id = tbl_elenco_diretoria.id_elenco 
                            inner join tbl_diretoria
                                on tbl_diretoria.id = tbl_elenco_diretoria.id_diretoria
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

// função para excluir um gênero pelo ID
const deleteElencoDiretoria = async function(id){
    try {
        let sql = `delete from tbl_elenco_diretoria where id = ${id};`

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
const deleteDiretoriasByIdElenco = async function(idElenco){
    try {
        let sql = `delete from tbl_elenco_diretoria where id_elenco = ${idElenco}`

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
    insertElencoDiretoria,
    updateElencoDiretoria,
    selectAllElencoDiretoria,
    selectByIdElencoDiretoria,
    selectElencoByIdDiretoria,
    selectDiretoriasByIdElenco,
    deleteElencoDiretoria,
    deleteDiretoriasByIdElenco
}