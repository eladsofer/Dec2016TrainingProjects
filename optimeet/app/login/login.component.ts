import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/toPromise';
import {AlertService, AuthenticationService} from '../services/index';
import {GlobalEventsManager} from "../GlobalEventsManager";

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private globalEventsManager: GlobalEventsManager) {
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout()
    this.globalEventsManager.showNavBar(false);
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.params['returnUrl'] || '/';
  }

  login() {
    this.loading = true;

    this.authenticationService.login(this.model.username, this.model.password)
      .then(user => {

        this.globalEventsManager.showNavBar(true);
        this.router.navigate([this.returnUrl]);
      })
      .catch(err => {
        this.alertService.error("Username or password is incorrect");
        this.loading = false;
      });

    return false;
  }
}
