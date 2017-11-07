import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { User } from "../factories";

/**
 * @ngdoc service
 * @name lunarc.user.UserService
 * @requires $resource
 * @description
 *
 * Service pour accéder aux utilisateurs.
 */
@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  /**
   * Retourne l'utilisateur correspondant à l'identifiant donné en paramètre.
   */
  public get(user: User) {
    return this.http.get("/user/" + user.Id);
  }

  /**
   * Return all users.
   */
  public query() {
    return this.http.get("/user");
  }

  /**
   * Add a new user.
   */
  public save(user: User) {
    return this.http.post("/user", user);
  }

  /**
   * Update a user.
   */
  public update(user: User) {
    return this.http.put("/user/" + user.Id, user);
  }

  /**
   * Delete a user.
   */
  public delete(user: User) {
    return this.http.delete("/user/" + user.Id);
  }
}
