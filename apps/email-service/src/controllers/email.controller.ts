import { Ctx, EventPattern, Payload, RmqContext, TcpContext } from '@nestjs/microservices';

import { EventName } from '../constants';
import { ActivationPayload, ResetPasswordPayload } from '../models';
import { EmailService } from '../services';

export class EmailController {
  public constructor(private _emailService: EmailService) {}

  @EventPattern(EventName.Confirmation.valueOf())
  public async sendConfirmationEmail(
    @Payload() payload: ActivationPayload,
    @Ctx() context: TcpContext,
  ): Promise<void> {
    this._emailService.sendConfirmationEmail(payload);
  }

  @EventPattern(EventName.Activation.valueOf())
  public async sendActivationEmail(
    @Payload() payload: ActivationPayload,
    @Ctx() context: TcpContext,
  ): Promise<void> {
    this._emailService.sendActivationEmail(payload);
  }

  @EventPattern(EventName.ResetPassword.valueOf())
  public sendResetPasswordEmail(
    @Payload() payload: ResetPasswordPayload,
    @Ctx() context: RmqContext,
  ): void {
    this._emailService.sendResetPasswordEmail(payload);
  }
}
