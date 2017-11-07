import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { Mail } from "../factories";

/**
 * @ngdoc service
 * @name lunarc.mail.MailService
 * @description
 *
 * Service pour envoyer des emails.
 */
@Injectable()
export class MailService {

  constructor(private http: HttpClient) {
  }

  /**
   * @ngdoc method
   * @name send
   * @methodOf lunarc.mail.MailService
   * @description
   *
   * Envoie un email
   *
   * @param {Mail} mail Email
   */
  public send(mail: Mail) {
    return this.http.post("/mail", mail);
  }
}
