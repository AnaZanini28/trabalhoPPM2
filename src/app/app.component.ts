import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public menus = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Moradores', url: '/moradores', icon: 'people-circle' },
    { title: 'Blocos', url: '/blocos', icon: 'business' },
    { title: 'Apartamentos', url: '/apartamentos', icon: 'bed' },
  ];
  constructor() {}
}
