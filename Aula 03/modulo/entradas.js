/********************************************************************
 * Objetivo: Criar funções com as entradas de dados
 * Data: 01/03/2026
 * Autor: Fernanda
 * Versão: 1.0
 *******************************************************************/

// biblioteca
const calculos = require('./calculos.js')
const generos = require('./nomes.js')

const iniciarIMC = function(entradaDeDados){
    // fazer escolha entre cm e metros
    entradaDeDados.question(`Digite o seu peso: `, function(peso){
        entradaDeDados.question(`Digite a sua altura em cm: `, function(altura){
    
            let m = calculos.validacao(peso, altura)
    
            if(m === false){
                entradaDeDados.close()
                return
            }
                // como 'm' é uma lista [n1, n2], passamos esses valores para o imc()
                let valorImc = calculos.imc(m[0], m[1])
    
                // e seguimos com a classificação
                let faixa = calculos.imcPeso(valorImc)
                console.log(`Seu IMC é: ${valorImc}\nVocê está na faixa de: ${faixa}`)
                entradaDeDados.close()
        }) // altura
    }) // peso
}

const iniciarSistemaNotas = function(entradaDeDados){
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
                                                    let resultadoExame = mediaExame.final >= 70 ? `aprovad${gen.artigo.toLocaleLowerCase()}` : `reprovad${gen.artigo.toLocaleLowerCase()}`
                                                    console.log(`
                                                        \nRelatório ${gen.do} ${gen.aluno}:
                                                        \n${gen.artigo} ${gen.aluno} ${nomeAluno} foi ${resultadoExame} na disciplina ${nomeDisciplina}.
                                                        \nCurso: ${nomeCurso}
                                                        \n${gen.professor}: ${nomeProfessor}
                                                        \nNotas ${gen.do} ${gen.aluno}: ${nota1}, ${nota2}, ${nota3}, ${nota4}
                                                        \nMédia Final: ${m.toFixed(2)}
                                                        \nMédia final do Exame: ${mediaExame.final}
                                            `)
                                                        entradaDeDados.close()
                                        })
                                    } else { 
                                                console.log(`
                                                    \nRelatório ${gen.do} ${gen.aluno}:
                                                    \n${gen.artigo} ${gen.aluno} ${nomeAluno} foi ${resultado} na disciplina ${nomeDisciplina}.
                                                    \nCurso: ${nomeCurso}
                                                    \n${gen.professor}: ${nomeProfessor}
                                                    \nNotas ${gen.do} ${gen.aluno}: ${nota1}, ${nota2}, ${nota3}, ${nota4}
                                                    \nMédia Final: ${m.toFixed(2)}
                                            `)
                                             entradaDeDados.close()
                                            } // else           
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
}

const iniciarTabuada = function(entradaDeDados){
    entradaDeDados.question(`Digite a tabuada inicial:`, function(tabuInicial){
        entradaDeDados.question(`Digite a tabuada final:`, function(tabuFinal){
            entradaDeDados.question(`Digite o contador inicial:`, function(contaInicial){
                entradaDeDados.question(`Digite o contador final:`, function(contaFinal){
                    calculos.tabuada(tabuInicial, tabuFinal, contaInicial, contaFinal)
                        entradaDeDados.close()
                }) // contador final
            }) // contador inicial
        }) // tabuada final
    }) // tabuada inicial
}

const iniciarFatorial = function(entradaDeDados){
    entradaDeDados.question(`Digite o número: `, function(numero){
    
            let f = calculos.validacao(numero)
            if(f === false){
                entradaDeDados.close()
                return
            }
        
            calculos.fatorial(f[0])
            
            entradaDeDados.close()
    }) // número
}

const iniciarImparOuPar = function(entradaDeDados){
    entradaDeDados.question(`Digite o primeiro número: `, function(n1){
        entradaDeDados.question(`Digite o segundo número: `, function(n2){
            entradaDeDados.question('Deseja ver (P)ares, (I)mpares ou (A)mbos? ', function(opcao) {
    
                let escolha = opcao.toLowerCase()
    
                // chamamos a validação direta. 
                // ela limpa os dados e, se estiverem ok, ela mesma executa o cálculo.
                calculos.imparOuParValidacao(n1, n2, escolha)
    
                entradaDeDados.close()
            }) // opção
        }) // segundo número
    }) // primeiro número
}

module.exports = {
    iniciarIMC,
    iniciarSistemaNotas,
    iniciarTabuada,
    iniciarFatorial,
    iniciarImparOuPar
}