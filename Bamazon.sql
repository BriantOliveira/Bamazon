CREATE DATABASE Bamazon; 

use BamazonBD; 

CREATE table 'Products' (
item_id init not null, 
product_name varchar(99) null, 
department_name varchar(99) null, 
'price' DECIMAL(10,2) null, 
'stockQuatity' init null, 
PRIMARY KEY ('id')
);