# cria o database do projeto de filmes
create database db_filmes_20261_a;

# ativa o uso do database de filmes
use db_filmes_20261_a;

show tables;

#-------------------[ Tabela de Filme ]--------------------#
create table tbl_filme (
	id 				int not null primary key auto_increment,
    nome 			varchar(80) not null,
    data_lancamento date not null,
    duracao 		time not null,
    sinopse 		text not null,
    avaliacao 		decimal(3,2) default null,
    valor 			decimal(5,2) not null default 0,
    capa 			varchar(255)
);

# inserir dados
insert into tbl_filme 	(
						nome, 
                        data_lancamento, 
                        duracao, 
                        sinopse, 
                        avaliacao, 
                        valor, 
                        capa,
                        id_classificacao_indicativa
						)
values 	(
		'AA', 
		'2026-04-02', 
        '01:40:00', 
        'BBBBBBBBBB.',
        '4',
        '40.00',
        'capa',
        '1'
        );
    
select * from tbl_filme;

select tbl_filme.nome as nome_filme, tbl_filme.sinopse, tbl_filme.data_lancamento, tbl_filme.capa,
		tbl_classificacao_indicativa.codigo, tbl_classificacao_indicativa.nome as nome_classificacao_indicativa
from tbl_filme
	inner join tbl_classificacao_indicativa
		on tbl_classificacao_indicativa.id = tbl_filme.id_classificacao_indicativa;

select * from tbl_filme order by id desc;

delete from tbl_filme where id > 0;

update tbl_filme set
		nome = 'Super Mario Galaxy: O Filme',
		data_lancamento = '2026-04-02',
		duracao = '01:39:00',
		sinopse = 'Uma nova aventura leva Mario a enfrentar um inédito e ameaçador super vilão. Em Super Mario Galaxy: O Filme, o bigodudo encanador italiano e seus aliados embarcam numa aventura galáctica repleta de ação e momentos emocionantes depois de salvar o Reino dos Cogumelos.',
		avaliacao = '3',
		valor = '30', 
		capa = 'https://br.web.img3.acsta.net/c_310_420/img/5b/ea/5bea1aeac3323aeaaf82449a34fafbbf.jpg'
    where id = 1;
    
delete from tbl_filme
    where id = 44;
#----------------------------------------------------------#

#-------------------[ Tabela de Classificação Indicativa ]--------------------#
create table tbl_classificacao_indicativa (
	id 			int not null primary key auto_increment,
    codigo 		varchar(3) not null,
    nome 		varchar(15) not null,
    descricao 	varchar(255) not null
);

insert into tbl_classificacao_indicativa (
	codigo,
    nome,
    descricao
)
values 	(
		'L', 
		'Livre', 
        'Não expõe crianças a conteúdos potencialmente prejudiciais'
        );

update tbl_classificacao_indicativa set
                    codigo      = '10',
                    nome        = '10 anos',
                    descricao   = 'algo'
                    where id = 3;
                    
delete from tbl_classificacao_indicativa
    where id = 4;
    
select * from tbl_classificacao_indicativa;
select * from tbl_classificacao_indicativa order by id desc;
#-----------------------------------------------------------------------------#

#-------------------[ Tabela de Gênero ]--------------------#
create table tbl_genero (
	id 			int not null primary key auto_increment,
    nome 		varchar(25) not null
);

insert into tbl_genero (nome) values ('aventura');

update tbl_genero set
		nome = 'terror'
        where id = 3;
        
delete from tbl_genero
	where id = 3;
    
select * from tbl_genero;
select * from tbl_genero order by id desc;
#-----------------------------------------------------------#

#-------------------[ Tabela de Elenco ]--------------------#
create table tbl_elenco (
	id 					int not null primary key auto_increment,
    nome 				varchar(255) not null,
    data_nascimento 	date default null
);

insert into tbl_elenco (
			nome,
            data_nascimento
) values(
			'David Fincher',
            '1962-08-28'
);

update tbl_elenco set
			nome = 'Stanley Kubrick',
            data_nascimento = '1928-07-26'
            where id = 2;
            
delete from tbl_elenco
	where id = 2;
    
select * from tbl_elenco;
select * from tbl_elenco order by id desc;
#-----------------------------------------------------------#

#-------------------[ Tabela de Nacionalidade ]--------------------#
create table tbl_nacionalidade (
	id 		int not null primary key auto_increment,
    nome 	varchar(50) not null
);

insert into tbl_nacionalidade (
			nome
) values(
			'Brasileiro'
);

update tbl_nacionalidade set
			nome = 'estadounidense'
            where id = 2;
            
delete from tbl_nacionalidade
	where id = 2;
    
select * from tbl_nacionalidade;
select * from tbl_nacionalidade order by id desc;
#------------------------------------------------------------------#

#-------------------[ Tabela de Atividade ]--------------------#
create table tbl_atividades (
	id 		int not null primary key auto_increment,
    nome 	varchar(40) not null
);
#--------------------------------------------------------------#

#-------------------[ Tabela de Nome Artistico ]--------------------#
create table tbl_nome_artistico (
	id 		int not null primary key auto_increment,
    nome 	varchar(255) default null
);
#-------------------------------------------------------------------#

#-------------------[ Tabela de Biografia ]--------------------#
create table tbl_biografia (
	id 			int not null primary key auto_increment,
    texto 		text default null
);
#--------------------------------------------------------------#
show tables;

#-------------------[ Tabela de diretoria ]--------------------#
create table tbl_diretoria (
	id 					int not null primary key auto_increment,
    marca_estilistica   varchar(120) not null,
    franquias_famosas 	varchar(200) default null
);

insert into tbl_diretoria (
			marca_estilistica,
            franquias_famosas
) values(
			'a',
            ''
);
#------------------------------------------------------------#

#-------------------[ Tabela de atuacao ]--------------------#
create table tbl_atuacao (
	id 				int not null primary key auto_increment,
    papel_obra   	varchar(150) not null,
    tipo_personagem varchar(100) not null
);
#---------------------------------------------------------#

#-------------------[ Tabela de dublagem ]--------------------#
create table tbl_dublagem (
	id 			int not null primary key auto_increment,
    personagem 	varchar(120) not null
);
#-------------------------------------------------------------#

#-------------------[ Tabela de roteirizacao ]--------------------#
create table tbl_roteirizacao (
	id 					int not null primary key auto_increment,
    estilo_narrativo 	varchar(120) not null,
    tema_recorrente		varchar(100) not null
);
#---------------------------------------------------------------#