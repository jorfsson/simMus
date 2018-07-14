DROP DATABASE IF EXISTS artists;

CREATE DATABASE artists;

USE artists;

CREATE TABLE artist (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL UNIQUE,
  image varchar(120),
  summary varchar(1000),
  url varchar(50) NOT NULL,
  listeners int NOT NULL,
  playcount int NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE similar (
  id int NOT NULL AUTO_INCREMENT,
  artist_id int,
  similar_id int,
  PRIMARY KEY (ID),
  FOREIGN KEY (artist_id) REFERENCES artist(id),
  FOREIGN KEY (similar_id) REFERENCES artist(id)
);

CREATE TABLE tags (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL UNIQUE,
  url varchar(50) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE artist_tags (
  id int NOT NULL AUTO_INCREMENT,
  artist_id int,
  tag_id int,
  PRIMARY KEY (ID),
  FOREIGN KEY (artist_id) REFERENCES artist(id),
  FOREIGN KEY (tag_id) REFERENCES tags(id)
);
--


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
