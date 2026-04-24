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