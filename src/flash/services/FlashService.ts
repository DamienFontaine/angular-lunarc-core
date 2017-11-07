import { Injectable } from "@angular/core";

/**
 * @ngdoc service
 * @name lunarc.flash.FlashService
 * @requires $rootScope
 * @description
 *
 * Service de message Flash
 */
@Injectable()
export class FlashService {
  private queue: string[] = [];
  private currentMessage: string = "";

  /**
   * @ngdoc method
   * @name set
   * @methodOf lunarc.flash.FlashService
   * @description
   *
   * Stockage du message
   *
   * @param {string} message Message
   */
  public set(message: string) {
    this.queue.push(message);
  }

  /**
   * @ngdoc method
   * @name get
   * @methodOf lunarc.flash.FlashService
   * @description
   *
   * Retourne le message courrant. Si le message est vide et
   * qu'il reste encore des messages dans la queue, alors il
   * retourne le dernier message de la queue.
   *
   * @returns {string} Le message
   */
  public get() {
    if (this.queue.length > 0) {
      this.currentMessage = this.queue.shift() as string;
    }
    return this.currentMessage;
  }

  /**
   * @ngdoc method
   * @name clear
   * @methodOf lunarc.flash.FlashService
   * @description
   *
   * Efface le message
   */
  public clear() {
    this.currentMessage = "";
  }
}
