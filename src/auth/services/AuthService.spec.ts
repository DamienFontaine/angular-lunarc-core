import { User } from "../../user/factories/User";
import { UserFactory } from "../../user/factories/UserFactory";
import { AuthService } from "./AuthService";

import { getTestBed, inject, TestBed } from "@angular/core/testing";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";

describe("lunarc.auth.AuthService", () => {

  interface IStoreObject {
    id_token: string;
  }

  let store: IStoreObject = { id_token: "" };

  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        UserFactory,
      ],
    });
    // LocalStorage mock.
    spyOn(localStorage, "getItem").and.callFake((key) => {
      return store[key];
    });
    Object.defineProperty(sessionStorage, "setItem", {
      writable: true,
    });
    spyOn(localStorage, "setItem").and.callFake((key, value) => {
      store[key] = value;
    });
  });

  it("should store a token", inject([AuthService, UserFactory], (authService, userFactory) => {

    expect(authService).toBeDefined();

    // tslint:disable-next-line:max-line-length
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0NDc3NjUzOTEsImV4cCI6MTYwNTUzMTc5MSwiYXVkIjoid3d3LmxpbmVvbGlhLm5ldCIsInN1YiI6ImRhbWllbi5mb250YWluZUBsaW5lb2xpYS5uZXQiLCJpZCI6IjEiLCJ1c2VybmFtZSI6ImRmb250YWluZSIsImVtYWlsIjoiZGFtaWVuLmZvbnRhaW5lQGxpbmVvbGlhLm5ldCJ9.DZEMdX7mhnbHqu_C7jnxMT4nly8zNGvfEYDERltmHeo";
    authService.storeToken(token);
    expect(store.id_token).toBe(token);
    expect(authService.user).toEqual(userFactory.create({
        Email: "damien.fontaine@lineolia.net",
        Id: "1",
        Username: "dfontaine",
      }));
  }));

  it("should be authenticated", inject([AuthService, UserFactory], (authService, userFactory) => {

    expect(authService).toBeDefined();

    // tslint:disable-next-line:max-line-length
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0NDc3NjUzOTEsImV4cCI6MTYwNTUzMTc5MSwiYXVkIjoid3d3LmxpbmVvbGlhLm5ldCIsInN1YiI6ImRhbWllbi5mb250YWluZUBsaW5lb2xpYS5uZXQiLCJpZCI6IjEiLCJ1c2VybmFtZSI6ImRmb250YWluZSIsImVtYWlsIjoiZGFtaWVuLmZvbnRhaW5lQGxpbmVvbGlhLm5ldCJ9.DZEMdX7mhnbHqu_C7jnxMT4nly8zNGvfEYDERltmHeo";
    localStorage.setItem("id_token", token);
    expect(authService.isAuthenticated()).toBe(true);
    expect(authService.user).toEqual(userFactory.create({
      Email: "damien.fontaine@lineolia.net",
      Id: "1",
      Username: "dfontaine",
    }));
  }));

  it("shouldn\"t be authenticated", inject([AuthService], (authService) => {

    expect(authService).toBeDefined();

    expect(authService.isAuthenticated()).toBe(false);
    expect(authService.user).toBe(undefined);
  }));

  it("shouldn\"t be authenticated, token is expired", inject([AuthService], (authService) => {

    expect(authService).toBeDefined();

    // tslint:disable-next-line:max-line-length
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0MTYyMzYwMDUsImV4cCI6MTQxNjE0OTYwNSwiYXVkIjoid3d3LmxpbmVvbGlhLm5ldCIsInN1YiI6ImRhbWllbi5mb250YWluZUBsaW5lb2xpYS5uZXQiLCJ1c2VybmFtZSI6ImRmb250YWluZSIsImVtYWlsIjoiZGFtaWVuLmZvbnRhaW5lQGxpbmVvbGlhLm5ldCIsImlkIjoiMSJ9.y4eqFLOcp7WYJoW0bzRrLGzNH2PvtVCdEAxrNlPwvL8";
    localStorage.setItem("id_token", token);
    expect(authService.isAuthenticated()).toBe(false);
    expect(authService.user).toBe(undefined);
  }));

  afterEach(() => {
    store = { id_token: "" };
  });

  afterAll(() => {
    TestBed.resetTestEnvironment();
  });
});
