const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/:id', (req, res) => {
  return db.query(`
    SELECT *
    FROM items
    WHERE items.id = $1
  `, [req.params.id])
    .then(({ rows: menuItems }) => {
      res.json(menuItems);
    })
    .catch((error) => {
      console.error('Error fetching menu items:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

router.get('/', (req, res) => {
  return db.query(`
    SELECT
      items.id AS id,
      items.section AS section,
      items.name AS name,
      items.vietnamese AS vietnamese,
      items.base_price AS base_price,
      json_agg(json_build_object(
        'size', item_options.size,
        'pieces', item_options.pieces,
        'ingredient', item_options.ingredient,
        'price_adjustment', item_options.price_adjustment
      )) AS options
    FROM items
    LEFT JOIN item_options ON items.id = item_options.item_id
    GROUP BY items.id
  `)
    .then(({ rows }) => {
      res.json(rows);
    })
    .catch((error) => {
      console.error('Error fetching items:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});




module.exports = router;
