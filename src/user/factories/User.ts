/**
 * @ngdoc service
 * @name lunarc.user.User
 * @description
 *
 * Utilisateur de Lunarc
 */
export class User {
  public Id: string;
  public Username: string;
  public Email: string;

  constructor(userInfo: any) {
    this.Id = userInfo.Id;
    this.Username = userInfo.Username;
    this.Email = userInfo.Email;
  }
}
