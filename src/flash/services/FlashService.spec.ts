import { FlashService } from "./FlashService";

import { getTestBed, inject, TestBed } from "@angular/core/testing";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";

describe("lunarc.flash.FlashService", () => {

  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FlashService,
      ],
    });
  });

  it("should add a message", inject([FlashService], (flashService) => {
    flashService.set("Hello");
    expect(flashService.get()).toBe("Hello");
  }));

  it("should add multiples messages", inject([FlashService], (flashService) => {
    flashService.set("Hello");
    flashService.set("World");
    expect(flashService.get()).toBe("Hello");
    expect(flashService.get()).toBe("World");
  }));

  it("should clear a message", inject([FlashService], (flashService) => {
    flashService.set("Hello");
    expect(flashService.get()).toBe("Hello");
    flashService.clear();
    expect(flashService.get()).toBe("");
  }));

  afterAll(() => {
    TestBed.resetTestEnvironment();
  });
});
