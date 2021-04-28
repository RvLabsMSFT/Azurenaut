import { Component, OnInit } from '@angular/core';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest, AuthenticationResult, AccountInfo, EventMessage, EventType } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { Azureb2cService } from '../../services/azureb2c.service';

@Component({
  selector: 'app-default-policies',
  templateUrl: './default-policies.component.html',
  styleUrls: ['./default-policies.component.scss']
})
export class DefaultPoliciesComponent implements OnInit {

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
  }

}
