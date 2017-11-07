import { Mail } from "./Mail";

/**
 * @ngdoc service
 * @name lunarc.mail.MailFactory
 * @description
 *
 * Fabrique Email
 */
export class MailFactory {
  public create(mailInfo: any) {
    return new Mail(mailInfo);
  }
}
