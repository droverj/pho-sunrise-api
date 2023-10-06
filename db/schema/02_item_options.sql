DROP TABLE IF EXISTS item_options CASCADE;

CREATE TABLE item_options (
  id SERIAL PRIMARY KEY,
  item_id INT REFERENCES items(id) ON DELETE CASCADE,
  size VARCHAR(50),
  pieces INT,
  ingredient VARCHAR(255),
  price_adjustment NUMERIC(10, 2) NOT NULL
);
