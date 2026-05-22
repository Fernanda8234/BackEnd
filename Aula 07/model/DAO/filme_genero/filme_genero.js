/* ******************************************************************************
* Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de 
*   relação entre Filme e Gênero
* Data: 22/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

// import da biblioteca para gerenciar o banco de dados Mysql no node.JS
const knex = require('knex')

// import do arquivo de configuração para conexão com o BD Mysql
const knexConfig = require('../../database_config_knew/knexFile.js')

// criar a conexão com o BD Mysql
const knexConex = knex(knexConfig.development)

const insertFilmeGenero = async function(filmeGenero){
    try {
        let sql = `insert into tbl_filme_genero (
                    id_filme, 
                    id_genero
                    ) 
            values (
                    ${filmeGenero.id_filme},
                    ${filmeGenero.id_genero}
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

const updateFilmeGenero = async function(filmeGenero){
    try {
        let sql = `update tbl_filme_genero set
                    id_filme = ${filmeGenero.id_filme},
                    id_genero = ${filmeGenero.id_genero}
                where id = ${filmeGenero.id}`

        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const selectAllFilmeGenero = async function(){
    try {
        let sql = `select * from tbl_filme_genero order by id desc`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdFilmeGenero = async function(id){
    try {
        let sql = `select * from tbl_filme_genero where id = ${id}`

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
const selectFilmeByIdGenero = async function(idGenero){
    try {
        let sql = `select tbl_filme.*
                        from tbl_filme
                            inner join tbl_filme_genero
                                on tbl_filme.id = tbl_filme_genero.id_filme 
                            inner join tbl_genero
                                on tbl_genero.id = tbl_filme_genero.id_genero
                    where tbl_genero.id = ${idGenero}`

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
const selectGenerosByIdFilme = async function(idFilme){
    try {
        let sql = `select tbl_genero.*
                        from tbl_filme
                            inner join tbl_filme_genero
                                on tbl_filme.id = tbl_filme_genero.id_filme 
                            inner join tbl_genero
                                on tbl_genero.id = tbl_filme_genero.id_genero
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

const deleteFilmeGenero = async function(id){
    try {
        let sql = `delete from tbl_filme_genero where id = ${id};`

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
    insertFilmeGenero,
    updateFilmeGenero,
    selectAllFilmeGenero,
    selectByIdFilmeGenero,
    selectFilmeByIdGenero,
    selectGenerosByIdFilme,
    deleteFilmeGenero
}