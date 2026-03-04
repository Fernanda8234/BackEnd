/********************************************************************
 * Objetivo: Criar um sistema que gerencie as médias escolares de uma universidade
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
                entradaDeDados.question(`Qual é o curso: `, function(nomeCurso){
                    entradaDeDados.question(`Qual é a disciplina: `, function(nomeDisciplina){
                        entradaDeDados.question(`Digite a nota 1: `, function(nota1){
                            entradaDeDados.question(`Digite a nota 2: `, function(nota2){
                                entradaDeDados.question(`Digite a nota 3: `, function(nota3){
                                    entradaDeDados.question(`Digite a nota 4: `, function(nota4){

                                        let m = calculos.media(nota1, nota2, nota3, nota4) // calculo da media
                                        let resultado = calculos.statusMedia(m, sexoAluno) // status do aluno

                                        let gen = generos.tratarGeneros(sexoAluno, sexoProfessor) // tratamento de genero

                                        if(resultado === 'recuperação'){
                                            entradaDeDados.question(`Digite a nota do exame: `, function(notaExame){

                                                let mediaExame = calculos.mediaFinal(nota1, nota2, nota3, nota4, notaExame)
                                                let resultadoExame = mediaExame.final >= 70 ? `aprovad${gen.artigo.toLocaleLowerCase}` : `reprovad${gen.artigo.toLocaleLowerCase}`
                                                console.log(`
                                                    \nRelatório ${gen.do} ${gen.aluno}:
                                                    \n${gen.artigo} ${gen.aluno} ${nomeAluno} foi ${resultadoExame} na disciplina ${nomeDisciplina}.
                                                    \nCurso: ${nomeCurso}
                                                    \n${gen.professor}: ${nomeProfessor}
                                                    \nNotas ${gen.do} ${gen.aluno}: ${nota1}, ${nota2}, ${nota3}, ${nota4}
                                                    \nMédia Final: ${m.toFixed(2)}
                                                    \nMédia final do Exame: ${mediaExame.final}
                                        `)
                                    })
                                } else { 
                                            console.log(`
                                                \nRelatório ${gen.do} ${gen.aluno}:
                                                \n${gen.artigo} ${gen.aluno} ${nomeAluno} foi ${resultado} na disciplina ${nomeDisciplina}.
                                                \nCurso: ${nomeCurso}
                                                \n${gen.professor}: ${nomeProfessor}
                                                \nNotas ${gen.do} ${gen.aluno}: ${nota1}, ${nota2}, ${nota3}, ${nota4}
                                                \nMédia Final: ${m.toFixed(2)}
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