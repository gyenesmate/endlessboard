import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ClimbingWallComponent } from '../../shared/climbing-wall/climbing-wall.component';
import { Wall } from '../../shared/wall';
import { RouteManagementService } from '../../services/route-management.service';
import { Route } from '../../shared/route';
import { UserManagementService } from '../../services/user-management.service';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../shared/user';

@Component({
  selector: 'app-route-search-page',
  imports: [
    ClimbingWallComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './route-search-page.component.html',
  styleUrl: './route-search-page.component.scss'
})
export class RouteSearchPageComponent {
  public userEmail!: string | null;
  public userName!: string | null;

  titleFilter = new FormControl('');   
  gradeFilter = new FormControl('');   

  filteredRoutes$!: Observable<Route[]>;

  wallData: Wall = {
    width: 50,
    height: 60,
  };

  public routes$!: Observable<Route[]>;

  private holdStateDict: Map<string, number>;

  constructor(
    private routeManagementService: RouteManagementService,
    private userManagementService: UserManagementService
  ) {
    this.holdStateDict = new Map ([
      ["start-hold", 0xff0000],
      ["hold", 0xFFFF00],
      ["end-hold", 0x00FF00],
      ["default-hold", 0x964B00],
      ["select-hold", 0x0000FF]
    ]);

    if (userManagementService.isLoggedIn()) {
      this.userEmail = localStorage.getItem("userEmail");
      this.userName = localStorage.getItem("userName");
    } else {
      this.userEmail = null;
      this.userName = null;
    }

    window.addEventListener('online', this.syncPendingLikes.bind(this));
  }

  async ngOnInit() {
    this.routes$ = this.routeManagementService.getAllRoutesObs();

    const title$ = this.titleFilter.valueChanges.pipe(startWith(''), debounceTime(200), distinctUntilChanged());
    const grade$ = this.gradeFilter.valueChanges.pipe(startWith(''), debounceTime(200), distinctUntilChanged());

    this.filteredRoutes$ = combineLatest([this.routes$, title$, grade$]).pipe(
      map(([routes, title, grade]) =>
        routes.filter(route =>
          (title ? route.title.toLowerCase().includes(title.toLowerCase()) : true) &&
          (grade ? route.grade?.toLowerCase().includes(grade.toLowerCase()) : true)
        )
      )
    );
  }

  trackById(index: number, item: Route) {
    return item.id;
  }

  public async toggleLikeRoute(r: Route): Promise<void> {
    if (this.userEmail) {      
      await this.routeManagementService.toggleLikeRoute(r, this.userEmail);
    }
  }

  async syncPendingLikes() {
    await this.routeManagementService.syncPendingLikes(this.routes$);
  }

  /* TODO: implement the like button changes when offline */
  isLikedByMe(route: Route) {
    if (this.userEmail) {
      return (route.likedBy ?? []).includes(this.userEmail);
    }
    return false;
  }

  async getUserNameByEmail(userEmail: string): Promise<string> {
    const userName = await this.userManagementService.readUserNameByEmail(userEmail);
    return userName || userEmail;
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
}
