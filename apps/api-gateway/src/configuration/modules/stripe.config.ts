export = {
  publishKey: String(process.env.STRIPE_PUBLISHABLE_KEY),
  secretKey: String(process.env.STRIPE_SECRET_KEY),
  webhookSecret: String(process.env.STRIPE_WEBHOOK_SECRET),
  currency: String(process.env.STRIPE_CURRENCY),
};
