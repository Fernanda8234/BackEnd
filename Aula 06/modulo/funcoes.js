/* *********************************************************************
* Objetivo: Funções para Usuários de Whatsapp
* Data: 13/04/2026  
* Autor: Fernanda
* Versão: 1.0
* **********************************************************************/

const meusContados = require('./contatos.js')

/*
Listar todos os dados de usuário independente do número
(Retornar todos os dados)
*/

const listaUsuarios = function(){
    let resultado = {
        usuarios: []
    }
    meusContados.contatos['whats-users'].forEach(function(contatos){
        resultado.usuarios.push(contatos)
    })
    return resultado
}

/*
Listar dados da conta do profile do usuário
(Todos os dados do profile que podem ser alterados como nome,“nick”,
foto, número, imagem, cor de fundo e dados da conta como criação e
encerramento, etc)
*/

const dadosAlteraveis = function(numero){
    let resultado = []

    meusContados.contatos['whats-users'].forEach(function(usuario){
        if(Number(usuario.number) == Number(numero)){
            const todasImagens = usuario.contacts?.map(contato => contato.image) || []
                resultado.push({
                nome: usuario.account,
                nick: usuario.nickname,
                foto: usuario['profile-image'],
                numero: usuario.number,
                image: todasImagens,
                cor_de_fundo: usuario.background,
                criacao_da_conta: usuario['created-since'].start,
                enceramento_da_conta: usuario['created-since'].end
            })
        }
    })
    return resultado.length > 0 ? resultado : false
}

/*
Listar dados de contato para cada usuário
(Retornar apenas os dados pessoais de cada contato do usuário, como
nome, foto e descrição)
*/

const dadosPessoais = function(numero, contato){
    let resultado = []

    meusContados.contatos['whats-users'].forEach(function(usuario){
            if(Number(usuario.number) == Number(numero)){
                const contatoMensagem = usuario.contacts.find(c => c.name.toLowerCase() == String(contato).toLowerCase())
                if (contatoMensagem) {
                    resultado.push({
                        contato: contatoMensagem.name,
                        foto: contatoMensagem.image,
                        descricao: contatoMensagem.description
                })
            }
        }
    })
    return resultado.length > 0 ? resultado : false
}

/*
Listar todas as mensagens trocadas de uma conta de usuário
(Retornar todos os dados)
*/

const dadosMensagens = function(numero){
    let resultado = []

    meusContados.contatos['whats-users'].forEach(function(usuario){
        if(Number(usuario.number) == Number(numero)){
            resultado.push({
                contatos: usuario.contacts,
                mensagens: usuario.contacts.flatMap(c => c.messages)
            })
        }
    })
    return resultado.length > 0 ? resultado : false
}

/*
Listar uma conversa de um usuário e um contato
(Retornar dados como: nome, número de celular e as
conversas). Deve obrigatoriamente encaminhar a referência
para encontrar a conversa via Query e não via parâmetro
*/

const dadosUsuarios = function(numero, contato){
    let resultado = []

    meusContados.contatos['whats-users'].forEach(function(usuario){
        if(Number(usuario.number) == Number(numero)){
            const contatoMensagem = usuario.contacts.find(c => c.name.toLowerCase() == String(contato).toLowerCase())
            if (contatoMensagem) {
                resultado.push({
                    nome: usuario.account,
                    numero: usuario.number,
                    contato: contatoMensagem.name,
                    descricao: contatoMensagem.description,
                    mensagens: contatoMensagem.messages
                })
            }  
        }
    })
    return resultado.length > 0 ? resultado : false
}
   
/* 
Realizar um filtro como “pesquisa de palavra chave” com
base em uma palavra nas conversas do usuário e do
respectivo contato
*/

const palavraChave = function(numero, chave){
    let resultado = []
   
    const pesquisa = String(chave).toUpperCase()
        meusContados.contatos['whats-users'].forEach(function(usuario){
            usuario.contacts.forEach(function(contato){
                contato.messages.forEach(function(mensagem){
                    const conteudo = String(mensagem.content).toUpperCase()
                        if(Number(usuario.number) == Number(numero)){
                            if(conteudo.includes(pesquisa)){
                                resultado.push({
                                    contato: contato.name,
                                    usuario: usuario.account,
                                    numero: usuario.number,
                                    mensagem: mensagem.content,
                                    horario: mensagem.time
                            })
                        }
                    }
                })
            })
        })
    return resultado.length > 0 ? resultado : false
}

module.exports = {
    listaUsuarios,
    dadosAlteraveis,
    dadosPessoais,
    dadosMensagens,
    dadosUsuarios,
    palavraChave
}