export = {
  enable: process.env.TCP_ENABLE === 'true',
  options: {
    host: String(process.env.TCP_HOST),
    port: Number(process.env.TCP_PORT),
    retryAttempts: 5,
    retryDelay: 1000,
  },
};
