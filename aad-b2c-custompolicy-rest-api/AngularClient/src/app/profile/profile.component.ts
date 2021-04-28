import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  myAccount: AccountInfo;

  constructor(private http: HttpClient, private authService: MsalService, private msalBroadcastService: MsalBroadcastService) { }

  ngOnInit(): void {
    this.myAccount = this.authService.instance.getActiveAccount();
    console.log(this.authService.instance.getActiveAccount().idTokenClaims);
  }

}
