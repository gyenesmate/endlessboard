import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ClimbingWallComponent } from '../../shared/climbing-wall/climbing-wall.component';
import { Wall } from '../../shared/wall';

@Component({
  selector: 'app-route-search-page',
  imports: [
    ClimbingWallComponent,
  ],
  templateUrl: './route-search-page.component.html',
  styleUrl: './route-search-page.component.scss'
})
export class RouteSearchPageComponent {
  wallData: Wall = {
    width: 40,
    height: 50,
    holds: [
      { angel: 0, state: "hold" },
      { angel: 45, state: "hold" },
      { angel: -30, state: "hold" },
      { angel: 90, state: "hold" }
    ]
  };
}
