import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig, Config } from '@configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const configService = app.get(ConfigService);
  // const moduleRef = app.select(AppModule);

  // Load configurations
  // const appConfig = configService.getOrThrow<AppConfig>(Config.App);

  await app.listen(3000, () => {
    console.log('starting app.. waiting for creating microservice...');
  });
  app.enableShutdownHooks();
  app.startAllMicroservices();
  app.init();

  return app.getUrl();
}
bootstrap()
  .then((url) => {
    console.log(`API gateway is running on : ${url}`);
  })
  .catch((e) => {
    console.log(e);
  });
