export { AppConfig } from './app-config.model';
export { BankConfig } from './bank-config.model';
export { BcryptConfig } from './bcrypt-config.model';
export { CloudinaryConfig } from './cloudinary-config.model';
export { CorsConfig } from './cors-config.model';
export { EmailVerificationConfig } from './email-verification-config.model';
export { JwtConfig } from './jwt-config.model';
export { MailConfig } from './mail-config.model';
export { MongoConfig } from './mongo-config.model';
export { PostgresConfig } from './postgres-config.model';
export { RateLimitingConfig } from './rate-limiting-config.model';
export { RedisConfig } from './redis-config.model';
export { RmqConfig } from './rmq-config.model';
export { SocialLoginConfig } from './social-login-config.model';
export { StripeConfig } from './stripe-config.model';
export { SwaggerConfig } from './swagger-config.model';
export { TcpConfig } from './tcp-config.model';
export { TwilioConfig } from './twilio-config.model';
export { TwoFactorAuthConfig } from './two-factor-auth-config.model';

export enum Config {
  App = 'APP',
  Bank = 'Bank',
  Bcrypt = 'BCRYPT',
  Cloudinary = 'CLOUDINARY',
  Cors = 'CORS',
  EmailVerification = 'EMAIL-VERIFICATION',
  Jwt = 'JWT',
  Mail = 'MAIL',
  Mongo = 'MONGO',
  Postgres = 'POSTGRES',
  RMQ = 'RMQ',
  RateLimiting = 'RATE-LIMITING',
  Redis = 'REDIS',
  SocialLogin = 'SOCIAL-LOGIN',
  Stripe = 'STRIPE',
  Swagger = 'SWAGGER',
  Tcp = 'TCP',
  Twilio = 'TWILIO',
  TwoFactorAuth = 'TWO-FACTOR-AUTH',
}
