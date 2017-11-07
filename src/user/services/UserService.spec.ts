import { UserService } from "./UserService";

import { HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { async, getTestBed, inject, TestBed } from "@angular/core/testing";

import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from "@angular/platform-browser-dynamic/testing";

describe("lunarc.user.UserService", () => {

  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
      ],
      providers: [
        UserService,
      ],
    });
  }));

  it("should return a list of users", async(
    inject([UserService, HttpTestingController], (userService, httpMock) => {

      const response = [{
        Email: "test@lunarc.ovh",
        Id: "55f06ff71d41c85de4000001",
        Password: "password",
        Salt: "salt",
      }, {
        Email: "test2@lunarc.ovh",
        Id: "55f06ff71d41c85de4000002",
        Password: "password2",
        Salt: "salt2",
      }];

      expect(userService).toBeDefined();

      const url = "/user";
      userService.query().subscribe((users) => {
        expect(users.length).toBeGreaterThan(1);
      });

      const request = httpMock.expectOne(url);
      expect(request.request.method).toEqual("GET");
      request.flush(response);
      httpMock.verify();
    })));

  it("should return a user", async(
    inject([UserService, HttpTestingController], (userService, httpMock) => {

      const response = {
        Email: "damien.fontaine@lineolia.net",
        Firstname: "Damien",
        Id: "55f06ff71d41c85de4000001",
        Lastname: "Fontaine",
        Password: "password",
        Salt: "salt",
        Username: "dfontaine",
      };

      expect(userService).toBeDefined();

      const url = "/user/1";
      userService.get({
        Id: "1",
      }).subscribe((user) => {
        expect(user.Id).toBe(response.Id);
      });

      const request = httpMock.expectOne(url);
      expect(request.request.method).toEqual("GET");
      request.flush(response);
      httpMock.verify();
    })));

  it("should delete a user", async(
    inject([UserService, HttpTestingController], (userService, httpMock) => {
      expect(userService).toBeDefined();

      const url = "/user/1";
      userService.delete({
        Id: "1",
      }).subscribe(() => {
        // Nothing
      });

      const request = httpMock.expectOne(url);
      expect(request.request.method).toEqual("DELETE");
      request.flush({});
      httpMock.verify();
    })));

  it("should update a user", async(
    inject([UserService, HttpTestingController], (userService, httpMock) => {

      const user = {
        FirstName: "Damien",
        Id: "1",
      };

      const response = {
        Firstname: "Damien",
        Id: "1",
      };

      expect(userService).toBeDefined();

      const url = "/user/1";
      userService.update(user).subscribe((newuser) => {
        expect(newuser.Id).toBe(response.Id);
      });

      const request = httpMock.expectOne(url);
      expect(request.request.method).toEqual("PUT");
      request.flush(response);
      httpMock.verify();
    })));

  it("should create a user", async(
    inject([UserService, HttpTestingController], (userService, httpMock) => {

      const user = {
        FirstName: "Damien",
      };

      const response = {
        Firstname: "Damien",
        Id: "1",
      };

      expect(userService).toBeDefined();

      const url = "/user";
      userService.save(user).subscribe((newuser) => {
        expect(newuser.Id).toBe(response.Id);
      });

      const request = httpMock.expectOne(url);
      expect(request.request.method).toEqual("POST");
      request.flush(response);
      httpMock.verify();
    })));

  afterAll(() => {
    TestBed.resetTestEnvironment();
  });
});
