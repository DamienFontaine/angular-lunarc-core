import { User } from "./User";

/**
 * @ngdoc service
 * @name lunarc.user.UserFactory
 * @description
 *
 * Fabrique Utilisateur
 */
export class UserFactory {
  public create(userInfo: any) {
    return new User(userInfo);
  }
}
