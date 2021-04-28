import { Component, OnInit } from '@angular/core';

import { Azureb2cService } from '../../services/azureb2c.service';

import { b2cTenant } from '../../aadB2cTenantConf';

@Component({
  selector: 'app-ief-policies',
  templateUrl: './ief-policies.component.html',
  styleUrls: ['./ief-policies.component.scss']
})
export class IefPoliciesComponent implements OnInit {

  loginDisplay = false;

  constructor(private Azureb2cService: Azureb2cService) { }

  ngOnInit(): void {
  }

  customLogin() {
    let promoFlowRequest = {
      scopes: ["openid"],
      authority: b2cTenant.policies.authorities.promoSusi.authority
    };

    this.Azureb2cService.login(promoFlowRequest);

  }

  logout() {
    this.Azureb2cService.logout();
  }
  

}
