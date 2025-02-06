import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendMail(
    sender: string,
    receiver: string,
    subject: string,
    html: string,
  ) {
    await this.mailerService.sendMail({
      to: receiver,
      from: sender,
      subject: subject,
      html: html,
    });
  }
}
