import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  links = [{name:'Lists', router: '/lists'}, {name:'Tasks', router: '/tasks'}];
  activeLink = this.links[0];
}
