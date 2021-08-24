/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'learning-workspace-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  links = [
    { route: '/about', description: 'About' },
    { route: '/todos', description: 'Todos' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
