CREATE TABLE revisions (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  type ENUM('content', 'relations', 'sources') NOT NULL,
  modifies int NOT NULL,
  date DATETIME NOT NULL,
  content JSON NOT NULL
);
