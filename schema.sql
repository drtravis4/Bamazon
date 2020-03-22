drop database if exists bamazon_db;
create database bamazon_db;

use bamazon_db;

create table products(
item_id int  NOT NULL auto_increment, 
department_name varchar(30), 
product_name varchar(30), 
price decimal(5,2),
stock_quantity int,
primary key(item_id)
)
