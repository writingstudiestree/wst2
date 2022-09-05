CREATE TABLE content (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  type ENUM('person', 'school', 'institution') NOT NULL,
  name varchar(1000) NOT NULL,
  date_created DATETIME NOT NULL DEFAULT NOW(),
  date_modified DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  content JSON NOT NULL,
  FULLTEXT KEY (name)
);

CREATE TABLE relations (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  type ENUM('mentored', 'studied at', 'worked at', 'worked alongside', 'served on') NOT NULL,
  subtype varchar(255) NOT NULL,
  link_from int NOT NULL,
  link_to int NOT NULL,
  year_start int NOT NULL,
  year_end int,
  date_created DATETIME NOT NULL DEFAULT NOW(),
  date_modified DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  content JSON NOT NULL,
  FOREIGN KEY (link_from)
    REFERENCES content(id)
    ON DELETE CASCADE,
  FOREIGN KEY (link_to)
    REFERENCES content(id)
    ON DELETE CASCADE
);

CREATE TABLE citations (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL,
  collection varchar(255) NOT NULL,
  date_created DATETIME NOT NULL DEFAULT NOW(),
  date_modified DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  content JSON NOT NULL
);

CREATE TABLE attributions (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  type ENUM('content', 'relations') NOT NULL,
  link_material int NOT NULL,
  link_citation int NOT NULL,
  FOREIGN KEY (link_citation)
    REFERENCES citations(id)
    ON DELETE CASCADE
);

CREATE TABLE revisions (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  type ENUM('content', 'relations', 'citations') NOT NULL,
  link_modifies int NOT NULL,
  date_created DATETIME NOT NULL DEFAULT NOW(),
  content JSON NOT NULL
);
