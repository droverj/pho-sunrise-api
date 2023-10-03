DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  phone_number VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  order_placed_at TIMESTAMPTZ DEFAULT NOW(),
  subtotal NUMERIC(10, 2) NOT NULL,
  total NUMERIC(10, 2) NOT NULL,
  instructions TEXT
);
