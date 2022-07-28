CREATE TABLE citations (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL,
  collection varchar(255) NOT NULL,
  content JSON NOT NULL
);
