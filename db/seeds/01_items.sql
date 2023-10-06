-- Spring Rolls options
INSERT INTO items (section, section_vietnamese, name, name_vietnamese, item_option, base_price, price_adjustment)
VALUES
  ('Appetizers', 'Món khai Vị', 'Spring Rolls', 'Chả Giò', '2 rolls', 5.99, NULL),
  ('Appetizers', 'Món khai Vị', 'Spring Rolls', 'Chả Giò', '4 rolls', 5.99, 1.00);

-- Wontons options
INSERT INTO items (section, section_vietnamese, name, name_vietnamese, item_option, base_price, price_adjustment)
VALUES
  ('Appetizers', 'Món khai Vị', 'Wontons', 'Hoành Thánh Tôm Chiên', '4 pieces', 6.99, NULL);

-- Mango Salad options
INSERT INTO items (section, section_vietnamese, name, name_vietnamese, item_option, base_price, price_adjustment)
VALUES
  ('Appetizers', 'Món khai Vị', 'Mango Salad', 'Gỏi Xoài', 'no meat', 13.99, NULL),
  ('Appetizers', 'Món khai Vị', 'Mango Salad', 'Gỏi Xoài', 'with grilled chicken', 2.00, NULL),
  ('Appetizers', 'Món khai Vị', 'Mango Salad', 'Gỏi Xoài', 'with shrimp', 3.00, NULL);

-- Beef Noodle Soup options
INSERT INTO items (section, section_vietnamese, name, name_vietnamese, item_option, base_price, price_adjustment)
VALUES
  ('Rice Noodle Soup', 'Phở', 'Beef Noodle Soup', 'Phở', 'small', 10.99, NULL),
  ('Rice Noodle Soup', 'Phở', 'Beef Noodle Soup', 'Phở', 'medium', 10.99, 0.50),
  ('Rice Noodle Soup', 'Phở', 'Beef Noodle Soup', 'Phở', 'large', 10.99, 1.50),
  ('Rice Noodle Soup', 'Phở', 'Beef Noodle Soup', 'Phở', 'extra large', 10.99, 2.50);
