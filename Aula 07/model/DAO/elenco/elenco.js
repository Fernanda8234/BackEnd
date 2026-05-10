/********************************************************************************
* Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de elenco
* Data: 10/05/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

const knex = require('knex')

const knexConfig = require('../../database_config_knew/knexFile.js')

const knexConex = knex(knexConfig.development)

const insertElenco = async function(elenco){
    try {
        let sql = `insert into tbl_elenco (
			nome,
            data_nascimento
        ) values(
			'${elenco.nome}',
            if('${elenco.data_nascimento}' = '', null, '${elenco.data_nascimento}')
        )`

        let result = await knexConex.raw(sql)

        if (result) 
            return result[0].insertId
          else
            return false
    } catch (error) {
        return false
    }
}

const updateElenco = async function(elenco){
    try {
        let sql = `update tbl_elenco set
                        nome = '${elenco.nome}',
                        data_nascimento = if('${elenco.data_nascimento}' = '', null, '${elenco.data_nascimento}') 
                    where id = ${elenco.id}` // para ele poder atualizar mesmo a data de nascimento estando vazia

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
        let sql = `select * from tbl_elenco order by id desc`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdElenco = async function(id){
    try {
        let sql = `select * from tbl_elenco where id = ${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteElenco = async function(id){
    try {
        let sql = `delete from tbl_elenco where id = ${id}`

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
    selectByIdElenco,
    deleteElenco
}