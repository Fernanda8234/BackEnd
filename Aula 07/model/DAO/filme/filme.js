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
                        '${filme.avaliacao}',
                        '${filme.valor},
                        '${filme.capa}'
                        );`

    // executar o ScriptSQL no banco de dados
    let result = await knexConex.raw(sql)

    if(result)
        return true
    else
        return false
}

// função para atualizar um filme existente na tabela
const updateFilme = async function(filme){
    
}

// função para retornar todos os dados da tabela de filme
const selectAllFilme = async function(){
    
}

// função para retornar os dados do filme filtrado pelo ID
const selectByIdFilme = async function(id){
    
}

// função para excluir um filme pelo ID
const deleteFilme = async function(id){
    
}

module.exports = {
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme
}