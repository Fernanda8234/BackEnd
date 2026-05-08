/* ******************************************************************************
* Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de classificação indicativa
* Data: 08/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

// import da biblioteca para gerenciar o banco de dados Mysql no node.JS
const knex = require('knex')

// import do arquivo de configuração para conexão com o BD Mysql
const knexConfig = require('../../database_config_knew/knexFile.js')

// criar a conexão com o BD Mysql
const knexConex = knex(knexConfig.development)

const insertClassificacaoIndicativa = async function(classificacao){
    // colocar o try e catch para erros
    try {

        let sql = `insert into tbl_classificacao_indicativa (
                    codigo,
                    nome,
                    descricao
                    )
                    values 	(
                            '${classificacao.codigo}', 
                            '${classificacao.nome}', 
                            '${classificacao.descricao}'
                            );`

        // executar o ScriptSQL no banco de dados
        let result = await knexConex.raw(sql)

        if(result)
            return result[0].insertId // id do banco
        else
            return false
    } catch (error) {
        return false
    }
}

const updateClassificacao = async function(classificacao){
    try {
        let sql = `update tbl_classificacao_indicativa set
                    codigo      = '${classificacao.codigo}',
                    nome        = '${classificacao.nome}',
                    descricao   = '${classificacao.descricao}'
                where id        =  ${classificacao.id}`
                
        let result = await knexConex.raw(sql)

        console.log(result)
            
        if(result)
            return true
        else
            return false
        
    } catch(error) {
        return false
    }
}

// lista as classificações :>
const selectAllClassificacao = async function(){
    try {
        let sql = `select * from tbl_classificacao_indicativa order by id desc`

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

const selectByIdClassificacao = async function(id){
    try {
        let sql = `select * from tbl_classificacao_indicativa where id=${id}`

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

const deleteClassificacao = async function(id){
    try {
        let sql = `delete from tbl_classificacao_indicativa where id = ${id}` 
        
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
    insertClassificacaoIndicativa,
    updateClassificacao,
    selectAllClassificacao,
    selectByIdClassificacao,
    deleteClassificacao
}