import type { ModuleMetadata } from '@nestjs/common';
import type { FactoryProvider } from '@nestjs/common/interfaces/modules/provider.interface';

import type { EmailConfig } from './email-config.model';

export type EmailConfigAsync = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<EmailConfig>, 'useFactory' | 'inject'>;
