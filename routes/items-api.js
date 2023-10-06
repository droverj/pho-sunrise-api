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
      id,
      section,
      section_vietnamese,
      name,
      name_vietnamese AS vietnamese,
      item_option,
      base_price,
      price_adjustment
    FROM items
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
