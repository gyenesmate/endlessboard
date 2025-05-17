import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ClimbingWallComponent } from '../../shared/climbing-wall/climbing-wall.component';
import { Wall } from '../../shared/wall';
import { RouteManagmentService } from '../../services/route-managment.service';
import { Route } from '../../shared/route';

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
  };

  public routeID: string = "routeHold";
  private routes!: Route[];

  constructor(
    private routeManagmentService: RouteManagmentService,
  ) {}

  public async printRouteOBJ(): Promise<void> {
    this.routes = await this.routeManagmentService.getAllRoutes();
    console.log(this.routes);
  }

  /* TODO: From the this.routes array make the routes visible on the html */
}
