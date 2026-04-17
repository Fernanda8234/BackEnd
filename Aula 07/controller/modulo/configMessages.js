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
const ERROR_BAD_REQUEST = {status: false, status_code: 400, message: 'Os dados enviados na requisição não estão corretos.'}

// mensagens de sucesso da API
const SUCCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'Registro inserido com sucesso.'}

module.exports = {
    DEFAULT_MESSAGE,
    ERROR_BAD_REQUEST,
    SUCCESS_CREATED_ITEM
}