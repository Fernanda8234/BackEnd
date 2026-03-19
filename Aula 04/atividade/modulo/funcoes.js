/* *********************************************************************
* Objetivo: Funções para a lista de estados
* Data: 18/03/2026  
* Autor: Fernanda
* **********************************************************************/
const arquivoEstados = require(`./estados_cidades.js`)

const getListaDeEstados = function(){

    let resultado = {
    uf: [],        // lista vazia esperando as siglas
    quantidade: 0  // zero por enquanto
    }

    arquivoEstados.listaDeEstados.estados.forEach(function(estado) {
        resultado.uf.push(estado.sigla)
    })
    resultado.quantidade = resultado.uf.length
    return resultado
    
}

const getDadosEstados = function(uf){
    let resultado = {
        uf: uf
    }

    arquivoEstados.listaDeEstados.estados.forEach(function(dadosDoEstado) {
        if(String(dadosDoEstado.sigla).toUpperCase() == String(uf).toUpperCase()){
            resultado.descricao = dadosDoEstado.nome
            resultado.capital = dadosDoEstado.capital
            resultado.regiao = dadosDoEstado.regiao
        }
    })
    return resultado
}

const getCapitalEstados = function(uf){
    let resultado = { 
        uf: uf
    }

    arquivoEstados.listaDeEstados.estados.forEach(function(capitalDosEstados){
        if(String(capitalDosEstados.sigla).toUpperCase() == String(uf).toUpperCase()){
            resultado.descricao = capitalDosEstados.nome
            resultado.capital = capitalDosEstados.capital
            }
        })
    return resultado
}

const getEstadosRegiao = function(regiao){
    let resultado = {
    regiao: regiao,
    estados: []
    }

    arquivoEstados.listaDeEstados.estados.forEach(function(estado) {
        if(String(estado.regiao).toUpperCase() == String(regiao).toUpperCase()){
            resultado.estados.push({
            uf: estado.sigla,
            descricao: estado.nome
            })
        }
    })
    return resultado
}
    
console.log(getListaDeEstados())
console.log(getDadosEstados('ac'))
console.log(getCapitalEstados('Ma'))
console.log(getEstadosRegiao('SUL'))