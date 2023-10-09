// stripe-api.js
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/process-payment', async (req, res) => {
  try {
    // Extract payment data from the request body
    const { amount, currency, payment_method } = req.body;

    // Ensure that the 'amount' parameter is provided
    if (!amount) {
      return res.status(400).json({ error: 'Missing required parameter: amount' });
    }

    // Create a PaymentIntent on Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method,
      confirm: true,
    });

    // Send the PaymentIntent's client secret back to the client
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// router.post('/webhook', (req, res) => {
//   const event = req.body;

//   // Verify the Stripe signature of the event (for security)
//   const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

//   try {
//     const verifiedEvent = stripe.webhooks.constructEvent(
//       req.rawBody, // Use raw body to verify signature
//       req.headers['stripe-signature'],
//       stripeWebhookSecret
//     );

//     // Handle specific webhook events
//     if (verifiedEvent.type === 'payment_intent.created') {
//       const paymentIntent = verifiedEvent.data.object;

//       // Retrieve relevant information from the paymentIntent object
//       const paymentMethodId = paymentIntent.payment_method;
//       const amount = paymentIntent.amount;
//       const currency = paymentIntent.currency;
//       const customerId = paymentIntent.customer;

//       // Perform any necessary actions or database updates here
//       // For example, you can save the payment information to your database

//       console.log(`Payment Intent created for ${currency} ${amount / 100} by customer ${customerId} using payment method ${paymentMethodId}`);

//       // Respond with a 200 OK status to acknowledge receipt of the event
//       res.json({ received: true });
//     }

//   } catch (error) {
//     console.error('Error handling webhook event:', error);
//     res.status(400).send('Webhook Error');
//   }
// });


module.exports = router;
