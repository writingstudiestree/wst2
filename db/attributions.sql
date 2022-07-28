CREATE TABLE attributions (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  table ENUM('content', 'relations') NOT NULL,
  link_material int NOT NULL,
  link_citation int NOT NULL
);
