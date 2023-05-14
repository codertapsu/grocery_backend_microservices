export = {
  secret: String(process.env.VERIFICATION_TOKEN_SECRET),
  expiresIn: Number(process.env.VERIFICATION_TOKEN_EXPIRATION_TIME),
};
