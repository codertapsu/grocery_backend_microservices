import type { ConfigFactoryKeyHost } from '@nestjs/config';
import { registerAs } from '@nestjs/config';

import { readdirSync } from 'fs';

type TFactory = () => Promise<unknown>;
type RegisteredConfig = ConfigFactoryKeyHost<ReturnType<TFactory>> & TFactory;

export function registerConfig(): RegisteredConfig[] {
  return readdirSync(__dirname)
    .filter((file) => file.includes('.config.js'))
    .map((file) => registerAs(file.replace('.config.js', '').toUpperCase(), () => import(`./${file}`)));
}
