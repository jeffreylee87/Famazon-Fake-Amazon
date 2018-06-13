DROP DATABASE IF EXISTS famazon;
CREATE DATABASE famazon;

USE famazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INTEGER(10),
  image VARCHAR(100) NULL,
  PRIMARY KEY (item_id)
);
  
INSERT INTO products (product_name, department_name, price, stock_quantity, image)
VALUES ("fish", "food", 5.00, 100, "><(((('>"), 
("rose", "flower", 10.00, 100, "@}}>-----"),
 ("knife", "hunting", 100.00, 100, ")xxxxx[;;;;;;;;;>"),
 ("needle", "medical", 4.00, 100, "|==|iiii|>----- "),
 ("two swords", "hunting", 1000.00, 100, "▬▬ι═══════ﺤ  -═══════ι▬▬"),
 ("rpg", "hunting", 10000.00, 5, "{>==╦╦=ʖ><O>"),
 ("rifle", "hunting", 2000.99, 20, "︻╦╤─"),
 ("barbell", "fitness", 99.99, 40, "▐▬▬▬▌"),
 ("tie fighter", "transportation", 1000000.00, 2, "|—O—|"),
 ("arrow", "hunting", 32.57, 100, "»»---------------------►");


