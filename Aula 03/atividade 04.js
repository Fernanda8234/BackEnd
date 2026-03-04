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

                                        let mA = calculos.validarMedia(nota1, nota2, nota3, nota4) // calculo da media

                                        if (mA === false) {
                                            entradaDeDados.close() 
                                            return
                                        }

                                        let m = calculos.media(mA[0], mA[1], mA[2], mA[3])

                                        let resultado = calculos.statusMedia(m, sexoAluno) // status do aluno

                                        let gen = generos.tratarGeneros(sexoAluno, sexoProfessor) // tratamento de genero

                                        function imprimirRelatorio(statusFinal, notaDoExame = null) {
                                            console.log(`
                                                \nRelatório ${gen.do} ${gen.aluno}:
                                                \n${gen.artigo} ${gen.aluno} ${nomeAluno} foi ${statusFinal} na disciplina ${nomeDisciplina}.
                                                \nCurso: ${nomeCurso}
                                                \n${gen.professor}: ${nomeProfessor}
                                                \nNotas ${gen.do} ${gen.aluno}: ${nota1}, ${nota2}, ${nota3}, ${nota4}
                                                \nMédia Final: ${m.toFixed(2)}
                                                ${notaDoExame ? `\nMédia Final do Exame: ${notaDoExame}` : ''}
                                            `)
                                        
                                            // Fecha a entrada de dados aqui dentro para garantir que o programa encerre.
                                            entradaDeDados.close()
                                        }                                        
                                        if (resultado === 'recuperação') {
                                            entradaDeDados.question(`Digite a nota do exame: `, function(notaExame) {
                                                
                                                let mediaExame = calculos.mediaFinal(nota1, nota2, nota3, nota4, notaExame)
                                                
                                                // define se foi aprovado ou reprovado no exame (usando o artigo correto: o/a)
                                                let statusExame = Number(mediaExame.final) >= 70 
                                                    ? `aprovad${gen.artigo.toLowerCase()}` 
                                                    : `reprovad${gen.artigo.toLowerCase()}`
                                        
                                                // chamada da função: Passamos o status novo e a nota que ele tirou no exame
                                                imprimirRelatorio(statusExame, mediaExame.final)
                                            })
                                        
                                        } else {
                                            imprimirRelatorio(resultado)
                                        }
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