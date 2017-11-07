import { MailService } from "./MailService";

import { HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { async, getTestBed, inject, TestBed } from "@angular/core/testing";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";

describe("lunarc.mail.MailService", () => {

  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        MailService,
      ],
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
      ],
    });
  }));

  it("should send a mail", async(inject([MailService, HttpTestingController], (mailService, httpMock) => {

    expect(mailService).toBeDefined();

    const url = "/mail";
    const message = { message: "Hello world !", to: "john@doe.lost", from: "postmaster@lunarc.ovh" };

    mailService.send(message).subscribe(() => {
      // Nothing
    });

    const request = httpMock.expectOne(url);
    expect(request.request.method).toEqual("POST");
    request.flush({});
    httpMock.verify();
  })));

  afterAll(() => {
    TestBed.resetTestEnvironment();
  });
});
