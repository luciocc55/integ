import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './utility/guards/auth.guard';
import { LoginGuard } from './utility/guards/login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'matchear',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/matchear/matchear.module').then((m) => m.MatchearModule),
  },
  {
    path: 'logout',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/logout/logout.module').then((m) => m.LogoutModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
