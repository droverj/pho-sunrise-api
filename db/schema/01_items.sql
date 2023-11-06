DROP TABLE IF EXISTS items CASCADE;

CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  section VARCHAR(50) NOT NULL,
  section_vietnamese VARCHAR(50),
  name VARCHAR(150) NOT NULL,
  name_vietnamese VARCHAR(150),
  item_option VARCHAR(50),
  price NUMERIC(10, 2) NOT NULL
);
