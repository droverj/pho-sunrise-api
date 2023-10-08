// stripe-api.js
const express = require('express');
const stripe = require('stripe')(process.env.sk_test_51MnhUnKSHW6cmLsU5tzUl4lrykfDx5dt4jYIhGYa7VsYScbRebiyNYoliSjQqv4nT7lcKPQctMUjGtWSmD9Wg26000TWtdSL4T);
const router = express.Router();


router.post('/process-payment', async (req, res) => {
  try {
    // Extract payment data from the request body
    const { amount, currency, payment_method } = req.body;

    // Create a PaymentIntent on Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method,
      confirm: true, // Set to true to confirm and process the payment
    });

    // Send the PaymentIntent's client secret back to the client
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
