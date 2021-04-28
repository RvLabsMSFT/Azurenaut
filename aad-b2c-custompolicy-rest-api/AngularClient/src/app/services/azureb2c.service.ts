import { Injectable,OnDestroy, OnInit, Inject } from '@angular/core';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest, AuthenticationResult, AccountInfo, EventMessage, EventType } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { apiConfig, b2cTenant } from '../aadB2cTenantConf';

@Injectable({
  providedIn: 'root'
})

export class Azureb2cService implements OnInit, OnDestroy {
  title = 'AngularClient';
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  currentActiveAccount: AccountInfo;

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        console.log('b2c service ini')
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
    });

    console.log('b2c service ini')
  }

  setActiveAccount() {
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
  }

  setLoginDisplay() {
    console.log(this.authService.instance.getAllAccounts().length > 0);
    return this.authService.instance.getAllAccounts().length > 0;
  }

  async login(userFlowRequest?: RedirectRequest) {
    await this.authService.handleRedirectObservable();

    if (this.msalGuardConfig.authRequest){
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest, ...userFlowRequest} as RedirectRequest);
    } else {
      this.authService.loginRedirect(userFlowRequest);
    }
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