import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { registerPageGuard } from './pages/register-page/register-page.guard';
import { loginPageGuard } from './pages/login-page/login-page.guard';
import { profilePageGuard } from './pages/profile-page/profile-page.guard';
import { routeBuilderPageGuard } from './pages/route-builder-page/route-builder-page.guard';

export const routes: Routes = [
    {
        path: "main",
        component: MainPageComponent
    },

    {
        path: "profile",
        loadComponent: () => import("./pages/profile-page/profile-page.component").then(c => c.ProfilePageComponent),
        canActivate: [profilePageGuard]
    },

    {
        path: "route-builder",
        loadComponent: () => import("./pages/route-builder-page/route-builder-page.component").then(c => c.RouteBuilderPageComponent),
        canActivate: [routeBuilderPageGuard]
    },

    {
        path: "route-search",
        loadComponent: () => import("./pages/route-search-page/route-search-page.component").then(c => c.RouteSearchPageComponent)
    },

    {
        path: "login",
        loadComponent: () => import("./pages/login-page/login-page.component").then(c => c.LoginPageComponent),
        canActivate: [loginPageGuard]
    },

    {
        path: "register",
        loadComponent: () => import("./pages/register-page/register-page.component").then(c => c.RegisterPageComponent),
        canActivate: [registerPageGuard]
    },

    {
        path: "**",
        redirectTo: "main"
    }
];
