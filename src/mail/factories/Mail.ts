/**
 * @ngdoc service
 * @name lunarc.mail.Mail
 * @description
 *
 * Email
 */
export class Mail {

  public message: string;
  public to: string;
  public from: string;

  constructor(mailInfo: any) {
    this.message = mailInfo.message;
    this.to = mailInfo.to;
    this.from = mailInfo.from || "";
  }
}
