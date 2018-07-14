DROP DATABASE IF EXISTS artists;

CREATE DATABASE artists;

USE artists;

CREATE TABLE artist (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  image varchar(50) NOT NULL,
  summary varchar(260) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE Similar (
  id int NOT NULL AUTO_INCREMENT,
  artist_id int,
  similar_id int,
  PRIMARY KEY (ID),
  FOREIGN KEY (artist_id) REFERENCES artist(id),
  FOREIGN KEY (similar_id) REFERENCES artist(id)
);
--


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
