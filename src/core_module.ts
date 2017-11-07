import { NgModule } from "@angular/core";

import { HttpClientModule } from "@angular/common/http";

import { AuthService } from "./auth/services/AuthService";
import { FlashService } from "./flash/services/FlashService";

import { UserFactory } from "./user/factories/UserFactory";
import { UserService } from "./user/services/UserService";

import { MailFactory } from "./mail/factories/MailFactory";
import { MailService } from "./mail/services/MailService";

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    UserService,
    UserFactory,
    MailService,
    MailFactory,
    FlashService,
    AuthService,
  ],
})
export class CoreModule {
}
