export = {
  host: String(process.env.MONGO_HOST),
  port: Number(process.env.MONGO_PORT),
  username: String(process.env.MONGO_USER),
  password: String(process.env.MONGO_PASSWORD),
  database: String(process.env.MONGO_DB),
};
