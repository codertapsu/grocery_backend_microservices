export = {
  accessKey: String(process.env.APP_JWT_ACCESS_TOKEN_KEY),
  accessSecret: String(process.env.APP_JWT_ACCESS_TOKEN_SECRET),
  accessExpiresIn: Number(process.env.APP_JWT_ACCESS_TOKEN_EXPIRATION_TIME),
  refreshKey: String(process.env.APP_JWT_REFRESH_TOKEN_KEY),
  refreshSecret: String(process.env.APP_JWT_REFRESH_TOKEN_SECRET),
  refreshExpiresIn: Number(process.env.APP_JWT_REFRESH_TOKEN_EXPIRATION_TIME),
};
