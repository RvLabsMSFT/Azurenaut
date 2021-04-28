import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionType, InteractionStatus, PopupRequest, RedirectRequest, AuthenticationResult, AuthError, AccountInfo } from '@azure/msal-browser';
import { from, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { apiConfig, b2cTenant } from './aadB2cTenantConf';

import { Azureb2cService } from './services/azureb2c.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ Azureb2cService ]
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'AngularClient';
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  currentActiveAccount: AccountInfo;

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private Azureb2cService: Azureb2cService
  ) {}

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
    });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  async login(userFlowRequest?: RedirectRequest) {
    await this.authService.handleRedirectObservable();

    if (this.msalGuardConfig.authRequest){
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest, ...userFlowRequest} as RedirectRequest);
    } else {
      this.authService.loginRedirect(userFlowRequest);
    }
  }

  promoCodeLogin() {
    let promoFlowRequest = {
      scopes: ["openid"],
      authority: b2cTenant.policies.authorities.promoSusi.authority
    };

    this.login(promoFlowRequest);
  }

  checkAndSetActiveAccount(){
    let activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
      this.currentActiveAccount = this.authService.instance.getActiveAccount();
    }
  }

  logout() {
    this.authService.logoutRedirect();
  }
  
  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

}
