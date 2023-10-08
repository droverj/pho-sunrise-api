DROP TABLE IF EXISTS order_items;

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES items(id),
  quantity INTEGER NOT NULL,
  item_name VARCHAR(150) NOT NULL,
  item_option VARCHAR (50),
  price NUMERIC(10, 2) NOT NULL
);
