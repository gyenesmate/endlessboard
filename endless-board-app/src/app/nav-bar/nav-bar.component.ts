import { Component, Input } from '@angular/core';
import { User } from '../shared/user'

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  public userName = "John";

}
