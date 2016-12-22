import { Component,OnInit } from '@angular/core';
//import map = webdriver.promise.map;

@Component({
  moduleId:module.id,
  selector: 'where-r-u',
  templateUrl: './where-r-u.component.html',
  styleUrls: ['./where-r-u.component.css']
})
export class WhereAreYou implements OnInit {
  latPartner: number = 32.0;
  lngPartner: number = 34.849007;
  latTask: number = 32.0;
  lngTask: number = 34.849007;
  lat: number = null;
  lng: number = null;

  constructor() {
    //this.loadMap();

  }

  ngOnInit() {
    let self = this;
    setInterval(() => {this.setPosition(self)},1000);
  }

  getLocation():number[]{
    return [this.lat,this.lng];
  }

  setPosition(self:any) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if(self.lat!=position.coords.latitude)
          self.lat = position.coords.latitude;
        if(self.lng != position.coords.longitude)
          self.lng = position.coords.longitude;
      });
    }
    ;
  }


  ShowLocation(location: number[])
  {
    this.latTask = location[0];
    this.lngTask = location[1];
  }

  ShowPartnerLocation(location: number[])
  {
    this.latPartner = location[0];
    this.lngPartner = location[1];
  }
}
