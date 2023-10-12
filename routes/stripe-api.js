// stripe-api.js
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/process-payment', async (req, res) => {
  const { paymentMethodId, amount } = req.body;

  try {
    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'cad',
      payment_method: paymentMethodId,
      confirmation_method: 'automatic',
      confirm: true,
      return_url: 'http://localhost:3000',
    });

    // If the paymentIntent is successful, you can send a success response
    res.json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during payment processing.' });
  }
});

module.exports = router;
