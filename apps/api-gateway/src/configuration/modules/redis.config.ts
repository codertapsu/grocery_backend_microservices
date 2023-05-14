export = {
  enable: process.env.REDIS_ENABLE === 'true',
  options: {
    host: String(process.env.REDIS_HOST),
    port: Number(process.env.REDIS_PORT),
    retryAttempts: 5,
    retryDelay: 1000,
  },
};
