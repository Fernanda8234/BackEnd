# cria o database do projeto de filmes
create database db_filmes_20261_a;

# ativa o uso do database de filmes
use db_filmes_20261_a;

# cria a tabela de filme
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

show tables;

# inserir dados
insert into tbl_filme 	(
						nome, 
                        data_lancamento, 
                        duracao, 
                        sinopse, 
                        avaliacao, 
                        valor, 
                        capa
						)
values 	(
		'AA', 
		'2026-04-02', 
        '01:40:00', 
        'BBBBBBBBBB.',
        '4',
        '40.00',
        'capa'
        );
    
select * from tbl_filme;
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
    

create table tbl_classificacao_indicativa (
	id 			int not null primary key auto_increment,
    codigo 		varchar(3) not null,
    nome 		varchar(15) not null,
    descricao 	varchar(255) not null
);

create table tbl_genero (
	id 			int not null primary key auto_increment,
    nome 		varchar(25) not null
);

create table tbl_elenco (
	id 					int not null primary key auto_increment,
    nome 				varchar(255) not null,
    data_nascimento 	date
);

create table tbl_nacionalidade (
	id 		int not null primary key auto_increment,
    nome 	varchar(50) not null
);

create table tbl_atividades (
	id 		int not null primary key auto_increment,
    nome 	varchar(40) not null
);

create table tbl_nome_artistico (
	id 		int not null primary key auto_increment,
    nome 	varchar(255)
);

create table tbl_filmografia (
	id 		int not null primary key auto_increment,
    filmes 	varchar(150)
);

create table tbl_biografia (
	id 			int not null primary key auto_increment,
    texto 		text
);

create table tbl_valor_aluguel (
	id 		int not null primary key auto_increment,
    preco 	decimal(5,2) not null
);