CREATE TABLE relations (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  type ENUM('mentored', 'studied at', 'worked at', 'worked alongside', 'served on') NOT NULL,
  subtype varchar(255) NOT NULL,
  link_from int NOT NULL,
  link_to int NOT NULL,
  year_start int NOT NULL,
  year_end int,
  content JSON NOT NULL
);
