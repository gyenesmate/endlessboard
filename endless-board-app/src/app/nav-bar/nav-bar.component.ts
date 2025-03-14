import { Component, Input } from '@angular/core';
import { User } from '../app.component'

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  public userName = "John";

}
