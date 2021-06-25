import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CuentasComponent } from './cuentas.component';

const routes: Routes = [
  {
    path: '',
    component: CuentasComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'roles' },
      {
        path: 'roles',
        loadChildren: () =>
          import('./roles/roles.module').then(
            (m) => m.RolesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentasRoutingModule {}
