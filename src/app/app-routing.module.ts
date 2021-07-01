import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
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
    path: 'matcheos',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/matcheos/matcheos.module').then((m) => m.MatchearModule),
  },
  {
    path: 'estatus',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/estatus/estatus.module').then((m) => m.EstatusModule),
  },
  {
    path: 'direcciones',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/direcciones/direcciones.module').then(
        (m) => m.DireccionesModule
      ),
  },
  {
    path: 'importacion',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/tasks/tasks.module').then((m) => m.TasksModule),
  },
  {
    path: 'cuentas',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/cuentas/cuentas.module').then((m) => m.CuentasModule),
  },
  {
    path: 'estadisticas',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/estadisticas/estadisticas.module').then(
        (m) => m.EstadisticasModule
      ),
  },
  {
    path: 'ultimas-importaciones',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/ultimas-importaciones/ultimas-importaciones.module').then((m) => m.UltimasImportacionesModule),
  },
  {
    path: 'logout',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/logout/logout.module').then((m) => m.LogoutModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
