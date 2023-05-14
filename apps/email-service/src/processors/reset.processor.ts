import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Inject, Injectable, Logger } from '@nestjs/common';

import { Job } from 'bull';
import { readFile } from 'fs/promises';
import { compile } from 'handlebars';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { join } from 'path';

import { EMAIL_CONFIG, EmailQueue, ProcessName } from '../constants';
import { EmailConfig, ResetPasswordPayload } from '../models';

@Injectable()
@Processor({
  name: EmailQueue.Reset.valueOf(),
})
export class ResetProcessor {
  private readonly _logger = new Logger(ResetProcessor.name);
  private readonly _mailerService: Mail;

  public constructor(@Inject(EMAIL_CONFIG) private _mailConfig: EmailConfig) {
    const smtpTransport = {
      host: _mailConfig.host,
      port: _mailConfig.port,
      secure: true,
      auth: {
        user: _mailConfig.address,
        pass: _mailConfig.password,
      },
      tls: { rejectUnauthorized: false },
    };
    this._mailerService = createTransport(smtpTransport);
  }

  @OnQueueActive()
  public onActive(job: Job): void {
    this._logger.debug(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  public onComplete(job: Job): void {
    this._logger.debug(`Completed job ${job.id} of type ${job.name}`);
  }

  @OnQueueFailed()
  public onError(job: Job<any>, error: any): void {
    this._logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack);
  }

  @Process(ProcessName.ResetPassword.valueOf())
  public async forgotPassword(job: Job<ResetPasswordPayload>): Promise<void> {
    try {
      const filePath = join(__dirname, '../templates/reset-password.html');
      const source = await readFile(filePath, 'utf-8');
      const template = compile(source);
      const replacements = {
        url: job.data.url,
      };
      const emailTemplate = template(replacements);
      await this._mailerService.sendMail({
        to: job.data.email,
        from: {
          name: 'Grocery',
          address: this._mailConfig.address,
        },
        subject: 'Reset password',
        html: emailTemplate,
      });
    } catch {
      this._logger.error(`Failed to send reset password email to '${job.data.email}'`);
    }
  }
}
