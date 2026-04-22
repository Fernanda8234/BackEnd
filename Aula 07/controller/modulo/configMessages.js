/* ******************************************************************************
* Objetivo: Arquivo responsável pela configuração e padronização das mensagens
*   da API
* Data: 17/04/2026  
* Autor: Fernanda
* Versão: 1.0
********************************************************************************/

// padronização de cabeçalho para retorno dos endpoints da API
const DEFAULT_MESSAGE = {
    api_description: 'API para gerenciar o controle de Filmes',
    development: 'Fernanda Cardoso da Mota',
    version: '1.0.4.26',
    status: Boolean,
    status_code: Number,
    response: {}
}

// mensagens de erro da API
const ERROR_BAD_REQUEST                 = {status: false, status_code: 400, message: 'Os dados enviados na requisição não estão corretos.'}
const ERROR_INTERNAL_SERVER_MODEL       = {status: false, status_code: 500, message: 'Não foi possível processar a requisição por conta de erro na API [ERRO NA MODELAGEM DE DADOS].'}
const ERROR_INTERNAL_SERVER_CONTROL     = {status: false, status_code: 500, message: 'Não foi possível processar a requisição por conta de erro na API [ERRO NA CONTROLLER].'}
const ERROR_CONTENT_TYPE                = {status: false, status_code: 415, message: 'Não foi possível processar a requisição, pois o formato de dados aceito pela API é somente JSON.'}

// mensagens de sucesso da API
const SUCCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'Registro inserido com sucesso.'}

module.exports = {
    DEFAULT_MESSAGE,
    ERROR_BAD_REQUEST,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROL,
    ERROR_CONTENT_TYPE,
    SUCCESS_CREATED_ITEM
}