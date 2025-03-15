import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
    {
        path: "main",
        component: MainPageComponent
    },

    {
        path: "profile",
        loadComponent: () => import("./profile-page/profile-page.component").then(c => c.ProfilePageComponent)
    },

    {
        path: "route-builder",
        loadComponent: () => import("./route-builder-page/route-builder-page.component").then(c => c.RouteBuilderPageComponent)
    },

    {
        path: "route-search",
        loadComponent: () => import("./route-search-page/route-search-page.component").then(c => c.RouteSearchPageComponent)
    },

    {
        path: "**",
        redirectTo: "main"
    }
];
