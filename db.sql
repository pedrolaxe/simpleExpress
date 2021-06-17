CREATE DATABASE api CHARACTER SET utf8 COLLATE utf8_general_ci;
USE api;

CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50),
  username varchar(50),
  password varchar(50),
  PRIMARY KEY (id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

INSERT INTO users (id, name, username, password) VALUES
(1, 'Pedro Laxe', 'pedrolaxe', '4410d99cefe57ec2c2cdbd3f1d5cf862bb4fb6f8');