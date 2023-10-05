-- Spring Rolls options
INSERT INTO item_options (item_id, size, quantity, ingredient, price_adjustment)
VALUES
  ((SELECT id FROM items WHERE name = 'Spring Rolls'), '2 rolls', NULL, NULL, 0.00),
  ((SELECT id FROM items WHERE name = 'Spring Rolls'), '4 rolls', NULL, NULL, 1.00);

-- Wontons options
INSERT INTO item_options (item_id, size, quantity, ingredient, price_adjustment)
VALUES
  ((SELECT id FROM items WHERE name = 'Wontons'), NULL, 4, NULL, 0.00);

-- Mango Salad options
INSERT INTO item_options (item_id, size, quantity, ingredient, price_adjustment)
VALUES
  ((SELECT id FROM items WHERE name = 'Mango Salad'), NULL, NULL, NULL, 0.00),
  ((SELECT id FROM items WHERE name = 'Mango Salad'), NULL, NULL, 'with grilled chicken', 2.00);

-- Beef Noodle Soup options
INSERT INTO item_options (item_id, size, quantity, ingredient, price_adjustment)
VALUES
  ((SELECT id FROM items WHERE name = 'Beef Noodle Soup'), 'small', NULL, NULL, 0.00),
  ((SELECT id FROM items WHERE name = 'Beef Noodle Soup'), 'medium', NULL, NULL, 0.50),
  ((SELECT id FROM items WHERE name = 'Beef Noodle Soup'), 'large', NULL, NULL, 1.50),
  ((SELECT id FROM items WHERE name = 'Beef Noodle Soup'), 'extra large', NULL, NULL, 2.50);
