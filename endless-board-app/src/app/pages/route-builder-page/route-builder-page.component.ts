import { Component } from '@angular/core';
import { ClimbingWallComponent } from '../../shared/climbing-wall/climbing-wall.component';

@Component({
  selector: 'app-route-builder-page',
  imports: [
    ClimbingWallComponent
  ],
  templateUrl: './route-builder-page.component.html',
  styleUrl: './route-builder-page.component.scss'
})
export class RouteBuilderPageComponent {

}
