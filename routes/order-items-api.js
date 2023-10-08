const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT *
      FROM order_items
    `;

    const result = await db.query(query);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'An error occurred while fetching orders.' });
  }
});

router.post('/', async (req, res) => {
  const orderItemData = req.body; // Assuming orderItemData is sent in the request body

  try {
    // Validate orderItemData
    if (
      !orderItemData.order_id ||
      !orderItemData.item_id ||
      orderItemData.quantity <= 0 ||
      !orderItemData.item_name ||
      orderItemData.price < 0
    ) {
      return res.status(400).json({ error: 'Invalid order item data' });
    }

    // Insert orderItemData into the "order_items" table
    const orderItemQuery = `
      INSERT INTO order_items (order_id, item_id, quantity, item_name, price)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const orderItemValues = [
      orderItemData.order_id,
      orderItemData.item_id,
      orderItemData.quantity,
      orderItemData.item_name,
      orderItemData.price,
    ];

    console.log(orderItemValues);

    // Use your "db" module or connection to execute the order item query
    const orderItemResult = await db.query(orderItemQuery, orderItemValues);

    res.json({ message: 'Order item added successfully', orderItem: orderItemResult.rows[0] });
  } catch (error) {
    console.error('Error adding order item:', error);
    res.status(500).json({ error: 'An error occurred while adding the order item.' });
  }
});

module.exports = router;
