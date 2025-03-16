import { Component } from '@angular/core';
import { ClimbingWallComponent } from '../climbing-wall/climbing-wall.component';

@Component({
  selector: 'app-route-builder',
  imports: [
    ClimbingWallComponent
  ],
  templateUrl: './route-builder.component.html',
  styleUrl: './route-builder.component.scss'
})
export class RouteBuilderComponent {

}
