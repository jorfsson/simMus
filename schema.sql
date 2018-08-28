DROP DATABASE IF EXISTS artists;

CREATE DATABASE artists;

USE artists;

CREATE TABLE artist (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL UNIQUE,
  image varchar(120) DEFAULT 'blank',
  summary varchar(1000) DEFAULT 'blank',
  url varchar(50) DEFAULT 'blank',
  listeners int DEFAULT 0,
  playcount int DEFAULT 0,
  PRIMARY KEY (ID)
);

CREATE TABLE similar (
  id int NOT NULL UNIQUE AUTO_INCREMENT,
  artist_id int NOT NULL,
  similar_id int NOT NULL,
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
  FOREIGN KEY (tag_id) REFERENCES tags(id),
);

ALTER TABLE `similar` ADD UNIQUE `unique_index` (`artist_id`,`similar_id`);

--


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
