create table cats(
	id int not null auto_increment,
	pid int not null default '0',
	name varchar(60) not null default '',
	desn text,
	primary key(id),
	index name(name,pid)
);

create table products(
	id int not null auto_increment,
	cid int not null default '0',
	name varchar(60) not null default '',
	price double(7,2) not null default '0.00',
	num int not null default '0',
	desn text,
	ptime int not null default '0',
	primary key(id),
	key pname(name, price)
);

insert into
products(cid, name, price, num, desn, ptime)
values(1, 'javajava', '34.5', '10', 'good', '2132321'),
(1, 'javatwo', '414.56', '30', 'very good', '123213321'),
(2, 'javaone', '441.56', '50', 'very good', '123213321'),
(2, 'j2seaaa', '144.56', '30', 'very good', '123213321'),
(3, 'j2messs', '44.56', '30', 'very good', '123213321'),
(3, 'fdsa', '44.56', '30', 'very good', '123213211'),
(3, 'ewewq', '84.56', '30', 'very good', '123213221'),
(4, 'kjlk', '244.56', '8', 'very good', '123213211'),
(4, 'lojkfds', '44.56', '30', 'veryod', '123213211'),
(4, 'jklfds', '944.56', '30', 'very good', '123213321'),
(4, 'fdsfds', '4444.56', '30', 'very good', '123213321'),
(5, 'fdsfds', '544.56', '30', 'very good', '123213321'),
(5, 'jwer', '44.56', '30', 'very good', '123213211'),
(5, 'jfdsa', '44.56', '90', 'very good', '123213221'),
(5, 'javatwado', '44.56', '30', 'very good', '123213321'),
(5, 'jkjavatwo', '4324.56', '30', 'very good', '113213321'),
(5, 'jadvatwo', '454.56', '30', 'very good', '123213321'),
(6, 'javsdatwo', '44.56', '30', 'very good', '123213321'),
(6, 'jawqvatwo', '454.56', '30', 'very good', '123213321'),
(6, 'jacxzvatwo', '4.56', '30', 'very good', '123213321'),
(6, 'javadsatwo', '44.56', '30', 'very good', '123213321'),
(6, 'javdsaatwo', '494.56', '30', 'very good', '113213321'),
(7, 'jadsavatwo', '48.56', '30', 'very good', '123213321'),
(7, 'jawrewvatwo', '324.56', '30', 'very good', '213213321'),
(8, 'javdasatwo', '4432.56', '30', 'very good', '213213321'),
(8, 'jawqeqvatwo', '434.56', '30', 'very good', '213213321'),
(8, 'jadewqewqvatwo', '442.56', '30', 'very good', '113213321')
