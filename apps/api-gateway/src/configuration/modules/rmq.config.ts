export = {
  enable: process.env.RMQ_ENABLE === 'true',
  options: {
    localUrl: String(process.env.RMQ_LOCAL_URL),
    cloudUrl: String(process.env.RMQ_CLOUD_URL),
    queue: String(process.env.RMQ_QUEUE_NAME),
    queueOptions: { durable: false },
    prefetchCount: 1,
  },
};
