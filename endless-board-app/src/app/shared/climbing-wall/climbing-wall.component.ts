import { Component } from '@angular/core';
import { Wall } from '../wall';
import { Hold } from '../hold';

@Component({
  selector: 'app-climbing-wall',
  imports: [],
  templateUrl: './climbing-wall.component.html',
  styleUrl: './climbing-wall.component.scss'
})
export class ClimbingWallComponent {
  public readonly Holds: Hold[] = [
    {
      angel: 90,
      pozX: 0,
      pozY: 0,
    },

    {
      angel: 90,
      pozX: 1,
      pozY: 0,
    }
  ];
  
  public readonly wall: Wall = {
    height: 100,
    width: 60,
    holds: this.Holds
  };

  

}
