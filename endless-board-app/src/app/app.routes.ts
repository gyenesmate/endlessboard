import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { loginPageGuardGuard } from './pages/login-page/login-page-guard.guard';
import { routeBuilderPageGuardGuard } from './pages/route-builder-page/route-builder-page-guard.guard';
import { profilePageGuardGuard } from './pages/profile-page/profile-page-guard.guard';

export const routes: Routes = [
    {
        path: "main",
        component: MainPageComponent
    },

    {
        path: "profile",
        loadComponent: () => import("./pages/profile-page/profile-page.component").then(c => c.ProfilePageComponent),
        canActivate: [profilePageGuardGuard]
    },

    {
        path: "route-builder",
        loadComponent: () => import("./pages/route-builder-page/route-builder-page.component").then(c => c.RouteBuilderPageComponent),
        canActivate: [routeBuilderPageGuardGuard]
    },

    {
        path: "route-search",
        loadComponent: () => import("./pages/route-search-page/route-search-page.component").then(c => c.RouteSearchPageComponent)
    },

    {
        path: "login",
        loadComponent: () => import("./pages/login-page/login-page.component").then(c => c.LoginPageComponent),
        canActivate: [loginPageGuardGuard]
    },

    {
        path: "**",
        redirectTo: "main"
    }
];
