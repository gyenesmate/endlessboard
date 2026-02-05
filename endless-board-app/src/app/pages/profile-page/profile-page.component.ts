import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../../services/user-management.service';
import { Router } from '@angular/router';
import { Route } from '../../shared/route';
import { RouteManagementService } from '../../services/route-management.service';
import { ClimbingWallComponent } from '../../shared/climbing-wall/climbing-wall.component';
import { Wall } from '../../shared/wall';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  imports: [
    ClimbingWallComponent,
    CommonModule
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  public userEmail!: string | null;
  public userName!: string | null;

  public routes$!: Observable<Route[]>;

  public wallData: Wall = {
      width: 50,
      height: 60,
  };

  private holdStateDict: Map<string, number>;

  constructor(
    private userManagementService: UserManagementService,
    private routeManagementService: RouteManagementService,
    private readonly router: Router
  ) {
    this.userEmail = localStorage.getItem("userEmail");
    this.userName = localStorage.getItem("authToken");

    this.holdStateDict = new Map ([
      ["start-hold", 0xff0000],
      ["hold", 0xFFFF00],
      ["end-hold", 0x00FF00],
      ["default-hold", 0x964B00],
      ["select-hold", 0x0000FF]
    ]);
  }

  async ngOnInit() {
    this.userEmail = localStorage.getItem('userEmail');
    if (this.userEmail) {
      const userDocId = await this.userManagementService.getUserDocIdByEmail(this.userEmail);
      if (userDocId) {
        this.routes$ = this.routeManagementService.getRoutesByUserDocIdObs(userDocId);
      }
    }
  }

  trackById(index: number, item: Route) {
    return item.id;
  }

  public onClimbingWallLoaded(route: Route, climbingWallComponent: ClimbingWallComponent) {    
    for (let i = 0; i < route.holds.length; i++) {
      climbingWallComponent.setHoldRotation(route.holds[i].posID, route.holds[i].angle);
      let holdStateHex = this.holdStateDict.get(route.holds[i].state);
      if (holdStateHex !== undefined) {
        climbingWallComponent.setHoldState(route.holds[i].posID, holdStateHex);
      }
    }
  }

  public async userNameChange(newName: string): Promise<void> {
    if (this.userEmail !== null) {
      await this.userManagementService.updateUserNameByEmail(this.userEmail, newName).then(() => {
        this.userEmail = newName;
        localStorage.setItem("authToken", newName);
        this.router.navigateByUrl("/main");
        alert("UserName has been updated!");
      });
    }
  }

  public async deleteRoute(routeID: string): Promise<void> {
    if (this.userEmail) {
      await this.routeManagementService.deleteRouteByEmailAndRouteId(this.userEmail, routeID);
      alert("Route has been deleted!");
    }
  }
}