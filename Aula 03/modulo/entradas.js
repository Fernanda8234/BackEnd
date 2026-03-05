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
    entradaDeDados.question(`Digite o seu peso: `, function(peso){
        entradaDeDados.question(`Escolha uma opção \n(1) Em cm \n(2) Em metros \nOpção: `, function perguntaOpcao(opcao){ 
            if (opcao !== '1' && opcao !== '2') {
                console.log('Erro: Opção inválida!')
                return perguntaOpcao()
            }

            entradaDeDados.question(`Digite a sua altura: `, function(altura) {
                // valida os dados uma única vez
                let m = calculos.validacao(peso, altura)
                if (!m) return entradaDeDados.close()

                // define a altura final (se for opção 2, converte; se não, usa direto)
                let metros = (opcao === "2") ? calculos.metrosParaCm(m[1]) : m[1]

                // calcula e mostra o resultado (sem repetir código!)
                let valorImc = calculos.imc(m[0], metros)
                let faixa = calculos.imcPeso(valorImc)

                console.log(`\nSeu IMC é: ${valorImc}\nVocê está na faixa de: ${faixa}`)
                entradaDeDados.close()
            })
        })
    })
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
                                                    let statusExame = Number(mediaExame.final) >= 60 
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