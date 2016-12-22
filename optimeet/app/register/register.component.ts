import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../services/index';
import {DayAndTime} from "../models/day.and.time.model";
import {user} from "../models/user.model";

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls:['register.component.css']
})

export class RegisterComponent  implements OnInit{
    model: user = new user();
    loading = false;
    cities: any[] = [];
    days: any[] = [];

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
      this.model = new user();
      this.model.PreferedTimes = [new DayAndTime()];
    }

  ngOnInit() {
    this.loadAllCities();
    this.loadDays();
  }
    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

  private loadAllCities() {
   this.cities = [{engName: 'bat yam'},{engName: 'beer sheva'}, {engName: 'haifa'},{engName: 'jerusalem'},{engName: 'kfar saba'},{engName: 'petah tikva'},{engName: 'tel aviv'}]
  }
  private loadDays() {
    this.days = [{engName: 'Sunday'},{engName: 'Monday'}, {engName: 'tuesday'},{engName: 'wednesday'},{engName: 'thursday'},{engName: 'friday'},{engName: 'saturday'}]
  }

  addDay():void{
    this.model.PreferedTimes.push(new DayAndTime());
  }

  removeDay(index: number):void{
    this.model.PreferedTimes.splice(index,1);
    if(this.model.PreferedTimes.length == 0){
      this.addDay();
    }
  }
}
