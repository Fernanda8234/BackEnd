/* *********************************************************************
* Objetivo: Mensagem de erro
* Data: 02/04/2026  
* Autor: Fernanda
* **********************************************************************/
const arquivoEstados = require(`./estados_cidades.js`)

const getListaDeEstados = function(){
    let resultado = {
    uf: [],        
    quantidade: 0  
    }

    arquivoEstados.listaDeEstados.estados.forEach(function(estado) {
        resultado.uf.push(estado.sigla)
    })
    resultado.quantidade = resultado.uf.length
    return resultado
}

const getDadosEstados = function(uf){
    let resultado = []

    arquivoEstados.listaDeEstados.estados.forEach(function(dadosDoEstado) {
        if(String(dadosDoEstado.sigla).toUpperCase() == String(uf).toUpperCase()){
            resultado.push({
            uf: dadosDoEstado.sigla,
            descricao: dadosDoEstado.nome,
            capital: dadosDoEstado.capital,
            regiao: dadosDoEstado.regiao
            })
        }
    })
        if(resultado.length == 0){
            return ({"message": "O estado informado não foi encontrado"}) 
        }
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
        if(!resultado.descricao){
            return ({"message": "O estado informado não foi encontrado"}) 
        }
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
            uf: estado.nome,
            descricao: estado.nome
            })
        }
    })
        if(resultado.estados.length == 0){
            return ({"message": "A região informada não foi encontrada"}) 
        }
    return resultado
}

const getCapitalPais = function(){
    let resultado = {
        capitais: []
    }

    arquivoEstados.listaDeEstados.estados.forEach(function(estado){
        if (estado.capital_pais) {
            resultado.capitais.push({
                capital_atual: estado.capital_pais.capital,
                uf: estado.sigla,
                descricao: estado.nome,
                capital: estado.capital,
                regiao: estado.regiao,
                capital_pais_ano_inicio: estado.capital_pais?.ano_inicio,
                capital_pais_ano_termino: estado.capital_pais?.ano_fim
            })
        }
    })
    return resultado
}
    
const getCidades = function(uf){
    let resultado = []
    
    arquivoEstados.listaDeEstados.estados.forEach(function(estado){
        let listaCidades = []
    
            estado.cidades.forEach(function(cidade){
                listaCidades.push(cidade.nome)
            })
    
            if(String(estado.sigla).toUpperCase() == String(uf).toUpperCase()){
            resultado.push({
                uf: estado.sigla,
                descricao: estado.nome,
                quantidade_cidades: listaCidades.length,
                cidades: listaCidades
            })
        }
    })
        if(resultado.length == 0){
            return ({"message": "O estado informado não foi encontrado"})          
        }
    return resultado
}

module.exports = {
    getListaDeEstados,
    getDadosEstados,
    getCapitalEstados,
    getEstadosRegiao,
    getCapitalPais,
    getCidades
}