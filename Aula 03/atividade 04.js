/********************************************************************
 * Objetivo: Criar um sistema que gerencie as médias escolares de uma
universidade
 * Data: 25/02/2026
 * Autor: Fernanda
 * Versão: 1.0
 *******************************************************************/

// biblioteca
const readline = require('readline')
const calculos = require('./modulo/calculos.js')
const generos = require('./modulo/nomes.js')

// entrada de dados
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

entradaDeDados.question(`Digite o nome do(a) aluno(a): `, function(nomeAluno){
    entradaDeDados.question(`Digite o nome do(a) professor(a): `, function(nomeProfessor){
        entradaDeDados.question(`Digite o sexo do(a) aluno(a): `, function(sexoAluno){
            entradaDeDados.question(`Digite o sexo do(a) professor(a): `, function(sexoProfessor){
                entradaDeDados.question(`Digite o nome do curso: `, function(nomeCurso){
                    entradaDeDados.question(`Digite o nome da disciplina: `, function(nomeDisciplina){
                        entradaDeDados.question(`Digite a nota 1: `, function(nota1){
                            entradaDeDados.question(`Digite a nota 2: `, function(nota2){
                                entradaDeDados.question(`Digite a nota 3: `, function(nota3){
                                    entradaDeDados.question(`Digite a nota 4: `, function(nota4){

                                        let m = calculos.media(nota1, nota2, nota3, nota4) // calculo da media
                                        let resultado = calculos.validarMedia(m, sexoAluno) // status do aluno

                                        let gen = generos.tratarGeneros(sexoAluno, sexoProfessor); // tratamento de genero

                                        if(resultado === 'recuperação'){
                                            entradaDeDados.question(`Digite a nota do exame: `, function(notaExame){

                                                let mediaExame = calculos.mediaFinal(m, notaExame)
                                                console.log(`
                                                    Relatório ${gen.do} ${gen.aluno}:
                                                    ${gen.artigo} ${gen.aluno} ${nomeAluno} foi ${resultado} na disciplina ${nomeDisciplina}.
                                                    Curso: ${nomeCurso}
                                                    ${gen.professor}: ${nomeProfessor}
                                                    Notas ${gen.do} ${gen.aluno}: ${nota1}, ${nota2}, ${nota3}, ${nota4}
                                                    Média Final: ${m.toFixed(2)}
                                                    Média final do Exame: ${mediaExame.toFixed(2)}
                                        `)
                                    })
                                } else { 
                                            console.log(`
                                                Relatório ${gen.do} ${gen.aluno}:
                                                ${gen.artigo} ${gen.aluno} ${nomeAluno} foi ${resultado} na disciplina ${nomeDisciplina}.
                                                Curso: ${nomeCurso}
                                                ${gen.professor}: ${nomeProfessor}
                                                Notas ${gen.do} ${gen.aluno}: ${nota1}, ${nota2}, ${nota3}, ${nota4}
                                                Média Final: ${m.toFixed(2)}
                                        `)}
                                    }) // nota 4
                                }) // nota 3
                            }) // nota 2
                        }) // nota 1
                    }) // disciplina
                }) // curso
            })
        })
    }) // professor
}) // aluno 