export = {
  enable: process.env.AUTH_2FA_ENABLED === 'true',
  secret: String(process.env.AUTH_2FA_SECRET),
  appName: String(process.env.AUTH_2FA_APP_NAME),
};
