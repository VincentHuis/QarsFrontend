import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AppNavbar } from './app-navbar/app-navbar';
import {ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './register/register';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    //RouterLink,
    ReactiveFormsModule,
    AppNavbar,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'Qars';
}
