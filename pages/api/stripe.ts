import Stripe from "stripe";
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, null);

export default async function handler(req, res) {
  console.log(req.body[0].image);

  if (req.method === 'POST') {
    console.log(req.body)
    try {
        const params: any = {
            submit_type: 'pay',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                { shipping_rate: 'shr_1MErTiKAYL4NDSN9rV85Iqsr' },
                { shipping_rate: 'shr_1MErVYKAYL4NDSN9EOxIa6RK' },
            ],
            line_items: req.body.map((item) => {
              const img = item.image[0].asset._ref;
              const newImage = img.replace('image-', 'https://cdn.sanity.io/images/irl0zn8w/production/').replace('-webp', '.webp');
              
              return {
                price_data: {
                  currency: 'jpy',
                  product_data: {
                    name: item.name,
                    images: [newImage]
                  },
                  unit_amount: item.price * 100
                },
                adjustable_quantity: {
                  enabled: true,
                  minimum: 1
                },
                quantity: item.quantity
              }
            }),
            mode: 'payment',
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/canceled`,
          }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}