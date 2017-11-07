import { User, UserFactory } from "../../user/index";

import { JwtHelper } from "angular2-jwt/angular2-jwt";

import { Injectable } from "@angular/core";

/**
 * @ngdoc service
 * @name lunarc.auth.AuthService
 * @requires jwtHelper
 * @requires lunarc.user.User
 * @description
 *
 * Service d'authentification ducky
 */
@Injectable()
export class AuthService {
  private jwtHelper: JwtHelper = new JwtHelper();
  private user: User;

  constructor(private userFactory: UserFactory) {}

  /**
   * @ngdoc method
   * @name setCredentials
   * @methodOf lunarc.auth.AuthService
   * @description
   *
   * Affectation du token...
   */
  public setCredentials() {
    const expToken: string = localStorage.getItem("id_token") as string;
    const tokenPayload = this.jwtHelper.decodeToken(expToken);
    this.user = this.userFactory.create({
      Email: tokenPayload.email,
      Id: tokenPayload.id,
      Username: tokenPayload.username,
    });
  }

  /**
   * @ngdoc method
   * @name storeToken
   * @methodOf lunarc.auth.AuthService
   * @description
   *
   * Stockage le token
   *
   * @param {string} id_token Identifiant du token
   */
  public storeToken(idToken: string) {
    localStorage.setItem("id_token", idToken);
    this.setCredentials();
  }

  /**
   * @ngdoc method
   * @name isAuthenticated
   * @methodOf lunarc.auth.AuthService
   * @description
   *
   * Retourne vrai si l'utilisateur est authentifié.
   */
  public isAuthenticated() {
    const expToken: string = localStorage.getItem("id_token") as string;
    try {
      const tokenPayload = this.jwtHelper.decodeToken(expToken);
      if (this.jwtHelper.isTokenExpired(expToken)) {
        delete this.user;
        return false;
      }
      this.setCredentials();
    } catch (err) {
      return false;
    }
    return true;
  }
}
