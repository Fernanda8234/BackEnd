/* *********************************************************************
* Objetivo: Funções para a lista de estados
* Data: 18/02/2026  
* Autor: Fernanda
* **********************************************************************/
const estadosCidades = require(`./estados_cidades.js`)

const lista = []

// criar uma função (getListaDeEstados) que retorna a lista de todos os estados do Brasil
const listaDeEstados = function(){

    estadosCidades.listaDeEstados.estados.forEach(function(uf) {
        lista.push(uf.sigla)
    })
    console.log(lista)
}

listaDeEstados()

// criar uma função (getDadosEstado) que retorna as informações referente a um estado do Brasil, onde a sigla do estado será o critério de filtro
const dadosEstados = function(){

    estadosCidades.listaDeEstados.estados.forEach(function(dadosDosEstado) {
        console.log(dadosDosEstado)
    })
}

// criar uma função (getCapitalEstado) que retorna as informações referente a capital de um estado do Brasil, onde a sigla do estado será o critério de filtro
const capitalEstados = function(){

    estadosCidades.listaDeEstados.estados.forEach(function(capitalEstados) {
        console.log(capitalEstados.capital)
    })
}

// capitalEstados()

// criar uma função (getEstadosRegiao) que retorna as informações referente aos estados do Brasil conforme a sua região, onde a região será o critério de filtro
const estadosRegiao = function(){

    estadosCidades.listaDeEstados.estados.forEach(function(estadosRegiao) {
        console.log(estadosRegiao.sigla)
        console.log(estadosRegiao.cidades)
    })
}

// estadosRegiao() - nop