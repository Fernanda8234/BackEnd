/* ******************************************************************************
* Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela filme
* Data: 15/04/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

// import da biblioteca para gerenciar o banco de dados Mysql no node.JS
const knex = require('knex')

// import do arquivo de configuração para conexão com o BD Mysql
const knexConfig = require('../../database_config_knew/knexFile.js')

// criar a conexão com o BD Mysql
const knexConex = knex(knexConfig.development)

// função para inserir dados na tabela de filme
const insertFilme = async function(filme){
    try {
        
    // console.log(sql) e colar o script no banco para ver se está tudo certo
    
        let sql =   `insert into tbl_filme 	(
                            nome, 
                            data_lancamento, 
                            duracao, 
                            sinopse, 
                            avaliacao, 
                            valor, 
                            capa
                            )
                    values 	(
                            '${filme.nome}', 
                            '${filme.data_lancamento}', 
                            '${filme.duracao}', 
                            '${filme.sinopse}',
                            if('${filme.avaliacao}' = '', null, '${filme.avaliacao}'),
                            '${filme.valor}',
                            '${filme.capa}'
                            );`

        // executar o ScriptSQL no banco de dados
        let result = await knexConex.raw(sql)

        //console.log(result)

        if(result)
            return result[0].insertId // retorna o ID gerado no BD
        else
            return false
    
        } catch (error) {
            //console.log(error)
            return false
    }
}

// função para atualizar um filme existente na tabela
const updateFilme = async function(filme){

    try {
    // script para atualizar os dados do BD
    let sql = 
    `update tbl_filme set
            nome            = '${filme.nome}',
            data_lancamento = '${filme.data_lancamento}',
            duracao         = '${filme.duracao}',
            sinopse         = '${filme.sinopse}',
            avaliacao       = if('${filme.avaliacao}' = '', null, '${filme.avaliacao}'),
            valor           = '${filme.valor}', 
            capa            = '${filme.capa}'
    where id                =  ${filme.id}`

    // executa o script SQL no BD
    let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false
        
    } catch(error) {
        return false
    }
}

// função para retornar todos os dados da tabela de filme
const selectAllFilme = async function(){
    try {
        // script para retornar todos os filmes
        let sql = `select * from tbl_filme order by id desc`

        // executa no banco de dados o script SQL para retornar os filmes
        let result = await knexConex.raw(sql)

        // console.log(result)

        /*
            validação para verificar se o retorno no BD é um Array
            se o scriptSQL der erro, o banco não devolver um Array 
        */
        if(Array.isArray(result)){
            return result[0]
        } else{
            return false
        }
    } catch (error) {
        return false
    }
    
}

// função para retornar os dados do filme filtrado pelo ID
const selectByIdFilme = async function(id){
    try {
        let sql = `select * from tbl_filme where id=${id}`

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

// função para excluir um filme pelo ID
const deleteFilme = async function(id){
    try {
        let sql = `delete from tbl_filme where id = ${id}`
        
        // executa o script SQL no BD
        let result = await knexConex.raw(sql)

            if(result)
                return true
            else
                return false
    } catch(error) {
        return false
    }
}


module.exports = {
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme
}