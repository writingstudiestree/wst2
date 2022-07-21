CREATE TABLE content (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  type ENUM('person', 'school', 'institution') NOT NULL,
  name varchar(255) NOT NULL,
  content JSON NOT NULL
);
