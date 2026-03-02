/********************************************************************
 * Objetivo: Criar uma função para tratar os gêneros
 * Data: 01/03/2026
 * Autor: Fernanda
 * Versão: 1.0
 *******************************************************************/
function tratarGeneros(sexoAluno, sexoProfessor) {
    // Definindo padrões (Masculino por padrão)
    let dados = {
        artigo: 'O',
        aluno: 'aluno',
        do: 'do',
        professor: 'Professor'
    };

    if (sexoAluno.toLowerCase() === 'feminino') {
        dados.aluno = 'aluna'
        dados.artigo = 'A'
        dados.do = 'da'
    }

    if (sexoProfessor.toLowerCase() === 'feminino') {
        dados.professor = 'Professora'
    } else {
        dados.professor = 'Professor'
    }

    return dados // Importante: devolve os nomes prontos
}

// tornando as duas funções públicas para este projeto
module.exports = {
    tratarGeneros
}