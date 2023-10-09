const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// GET all orders with associated order items
router.get('/', async (req, res) => {
  try {
    // Query to select orders along with their associated order items
    const query = `
      SELECT
        o.id AS order_id,
        o.user_id,
        o.name AS order_name,
        o.phone_number,
        o.email,
        o.order_placed_at,
        o.subtotal,
        o.total,
        o.items_quantity,
        o.instructions,
        oi.id AS order_item_id,
        oi.item_id,
        oi.quantity AS item_quantity,
        oi.item_name,
        oi.item_option,
        oi.price AS item_price
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      ORDER BY o.id DESC;
    `;

    const result = await db.query(query);

    // Process the result to group order items by order
    const orders = [];
    const orderMap = new Map();

    result.rows.forEach((row) => {
      const orderId = row.order_id;
      if (!orderMap.has(orderId)) {
        // Create a new order object if it doesn't exist in the map
        const order = {
          id: orderId,
          user_id: row.user_id,
          name: row.order_name,
          phone_number: row.phone_number,
          email: row.email,
          order_placed_at: row.order_placed_at,
          subtotal: row.subtotal,
          total: row.total,
          items_quantity: row.items_quantity,
          instructions: row.instructions,
          order_items: [],
        };
        orders.push(order);
        orderMap.set(orderId, order);
      }

      // Add order items to the corresponding order
      if (row.order_item_id) {
        const orderItem = {
          id: row.order_item_id,
          item_id: row.item_id,
          quantity: row.item_quantity,
          item_name: row.item_name,
          item_option: row.item_option,
          price: row.item_price,
        };
        orderMap.get(orderId).order_items.push(orderItem);
      }
    });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders with order items:', error);
    res.status(500).json({ error: 'An error occurred while fetching orders.' });
  }
});

router.post('/', async (req, res) => {
  const orderData = req.body; // Assuming orderData is sent in the request body

  try {
    // Validate orderData
    if (
      !orderData.name ||
      !orderData.phone_number ||
      !orderData.email ||
      orderData.subtotal < 0 ||
      orderData.total < 0 ||
      orderData.items_quantity <= 0 ||
      !Array.isArray(orderData.cart) || orderData.cart.length === 0
    ) {
      return res.status(400).json({ error: 'Invalid order data' });
    }

    // Insert orderData into the "orders" table
    const orderQuery = `
      INSERT INTO orders (user_id, name, phone_number, email, subtotal, total, items_quantity, instructions)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    const orderValues = [
      orderData.user_id, // You need to specify the user_id
      orderData.name,
      orderData.phone_number,
      orderData.email,
      orderData.subtotal,
      orderData.total,
      orderData.items_quantity,
      orderData.instructions,
    ];

    // Use your "db" module or connection to execute the order query
    const orderResult = await db.query(orderQuery, orderValues);

    res.json({ message: 'Order submitted successfully', order: orderResult.rows[0] });
  } catch (error) {
    console.error('Error submitting order:', error);
    res.status(500).json({ error: 'An error occurred while processing your order.' });
  }
});

module.exports = router;
