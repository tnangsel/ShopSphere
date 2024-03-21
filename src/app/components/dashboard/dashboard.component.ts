import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('slideInFromRight', [
      state('void', style({ transform: 'translateX(100%)', opacity: 0 })),
      transition(':enter', [
        animate('1.5s ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ]),
    trigger('slideInFromLeft', [
      state('void', style({ transform: 'translateX(-100%)', opacity: 0 })),
      transition(':enter', [
        animate('1.5s ease-out', style({ transform: 'translateX(5)', opacity: 1 }))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit{

  welcomeText: string = "Welcome  Admin";
  letters: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.letters = this.welcomeText.split('').concat([' ']);
  }
}
