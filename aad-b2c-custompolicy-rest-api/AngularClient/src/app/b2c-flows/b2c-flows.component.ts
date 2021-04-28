import { Component, OnInit } from '@angular/core';

import { from, Subject } from 'rxjs';

import { Azureb2cService } from '../services/azureb2c.service';

@Component({
  selector: 'app-b2c-flows',
  templateUrl: './b2c-flows.component.html',
  styleUrls: ['./b2c-flows.component.scss']
})
export class B2cFlowsComponent implements OnInit {

  
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
    
  }

  /**

    setLoginDisplay() {
    this.Azureb2cService.setLoginDisplay();
  }

  async login(userFlowRequest?: RedirectRequest) {

    this.Azureb2cService.login();
  }

  promoCodeLogin() {
    let promoFlowRequest = {
      scopes: ["openid"],
      authority: b2cTenant.policies.authorities.promoSusi.authority
    };

    this.login(promoFlowRequest);
  }

  checkAndSetActiveAccount(){
    this.Azureb2cService.checkAndSetActiveAccount();
  }

  logout() {
    this.Azureb2cService.logout();
  }
  
  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

   */

}
