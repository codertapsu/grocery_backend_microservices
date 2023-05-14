import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';

import { Queue } from 'bull';

import { EmailQueue, ProcessName } from '../constants';
import { ActivationPayload, ResetPasswordPayload } from '../models';

@Injectable()
export class EmailService {
  private readonly _logger = new Logger(EmailService.name);

  public constructor(
    @InjectQueue(EmailQueue.Activation.valueOf())
    private _activationQueue: Queue<ActivationPayload>,
    @InjectQueue(EmailQueue.Reset.valueOf()) private _resetQueue: Queue<ResetPasswordPayload>,
  ) {}

  public async sendActivationEmail(payload: ActivationPayload): Promise<void> {
    try {
      await this._activationQueue.add(ProcessName.Activation.valueOf(), payload);
    } catch (error) {
      this._logger.error(`Error queueing registration email to user ${payload.email}`);

      throw error;
    }
  }

  public async sendConfirmationEmail(payload: ActivationPayload): Promise<void> {
    try {
      await this._activationQueue.add(ProcessName.Confirmation.valueOf(), payload);
    } catch (error) {
      this._logger.error(`Error queueing registration email to user ${payload.email}`);

      throw error;
    }
  }

  public async sendResetPasswordEmail(payload: ResetPasswordPayload): Promise<void> {
    try {
      await this._resetQueue.add(ProcessName.ResetPassword.valueOf(), payload);
    } catch (error) {
      this._logger.error(`Error queueing email reset password to user ${payload.email}`);

      throw error;
    }
  }
}
