import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page/main-page.component';
import { ProfilePageComponent } from './profile-page/profile-page/profile-page.component';
import { RouteBuilderPageComponent } from './route-builder-page/route-builder-page/route-builder-page.component';

export const routes: Routes = [
    {
        path: "main",
        component: MainPageComponent
    },

    {
        path: "profile",
        component: ProfilePageComponent
    },

    {
        path: "route-builder",
        component: RouteBuilderPageComponent
    },

    {
        path: "**",
        component: MainPageComponent
    }
];
