DROP DATABASE IF EXISTS famazon;
CREATE DATABASE famazon;

USE famazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(25,2) NULL,
  stock_quantity INTEGER(10),
  image VARCHAR(100) NULL,
  product_sales DECIMAL(25,2) NULL,
  PRIMARY KEY (item_id)
);

CREATE TABLE departments(
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs DECIMAL(25,2) DEFAULT 50000,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("food", 50000), ("flower", 5000), ("hunting", 100000), ("medical", 1000), ("fitness", 9000), ("transportation", 500000); 

INSERT INTO products (product_name, department_name, price, stock_quantity, image, product_sales)
VALUES ("fish", "food", 5.00, 100, "><(((('>", 0), 
("rose", "flower", 10.00, 100, "@}}>-----", 0),
 ("knife", "hunting", 100.00, 100, ")xxxxx[;;;;;;;;;>", 0),
 ("needle", "medical", 4.00, 100, "|==|iiii|>----- ", 0),
 ("two swords", "hunting", 1000.00, 100, "▬▬ι═══════ﺤ  -═══════ι▬▬", 0),
 ("rpg", "hunting", 10000.00, 5, "{>==╦╦=ʖ><O>", 0),
 ("rifle", "hunting", 2000.99, 20, "︻╦╤─", 0),
 ("barbell", "fitness", 99.99, 40, "▐▬▬▬▌", 0),
 ("tie fighter", "transportation", 1000000.00, 2, "|—O—|", 0),
 ("arrow", "hunting", 32.57, 100, "»»---------------------►", 0);


