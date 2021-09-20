import { Component } from '@angular/core';

@Component({
  selector: 'learning-workspace-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  links = [
    { route: '/about', description: 'About' },
    { route: '/todos', description: 'Todos' },
  ];
}
