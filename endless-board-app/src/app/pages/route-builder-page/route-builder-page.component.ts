import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { ClimbingWallComponent } from '../../shared/climbing-wall/climbing-wall.component';
import { Wall } from '../../shared/wall';

@Component({
  selector: 'app-route-builder-page',
  imports: [
    ClimbingWallComponent
  ],
  templateUrl: './route-builder-page.component.html',
  styleUrl: './route-builder-page.component.scss'
})
export class RouteBuilderPageComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.holdsEventlistener();
  }
  public wallData: Wall = {
      width: 50,
      height: 60,
    };

  routeID1: string = "routeID1";

  @ViewChild(ClimbingWallComponent)
  climbingWallComponent!: ClimbingWallComponent;

  public randomRouteBuilder(): void {
    let holdIDs = 0;
    if (this.climbingWallComponent) {
      for (let i = 0; i <= 48; i++) {
        this.climbingWallComponent.holdRotation(i, Math.floor(Math.random() * (360 - 0 + 1) + 0));
        holdIDs++;
      }
    }
  }

  private holdsEventlistener(): void {
    let holdIDs = 0;    
    for (let i = 0; i < 48; i++) {
      let hold = this.climbingWallComponent.getHold(holdIDs);      
      if (hold) {        
        hold.addEventListener('click', () => {
          /* TODO: This is not working */
          console.log("hello");
          
          /* hold.material.color.setHex(0xffffff); */
        });
      }
      
      holdIDs++;
    }
  }
}
