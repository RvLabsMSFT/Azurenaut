import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AccountInfo, AuthenticationResult, EventMessage, EventType } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';

import { Azureb2cService } from '../services/azureb2c.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loginDisplay = false;
  //myAccount: AccountInfo;

  constructor(private authService: MsalService, private msalBroadcastService: MsalBroadcastService) { }

  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe({
        next: (result: EventMessage) => {
          console.log(result);
          const payload = result.payload as AuthenticationResult;
          this.authService.instance.setActiveAccount(payload.account);
        },
        error: (error) => console.log(error)
    });

    this.setLoginDisplay();
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
    console.log(this.authService.instance.getActiveAccount());
  }



}
