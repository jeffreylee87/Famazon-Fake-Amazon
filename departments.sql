DROP DATABASE IF EXISTS famazon;
CREATE DATABASE famazon;

USE famazon;

CREATE TABLE departments(
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs DECIMAL(25,2) DEFAULT 50000,
  product_sales DECIMAL(25,2) NULL,
  total_profit DECIMAL(25,2) NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES (test, 10000);