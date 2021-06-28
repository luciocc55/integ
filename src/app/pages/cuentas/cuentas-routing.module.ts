import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CuentasComponent } from './cuentas.component';

const routes: Routes = [
  {
    path: '',
    component: CuentasComponent,
    children: [
      {
        path: 'roles',
        loadChildren: () =>
          import('./roles/roles.module').then((m) => m.RolesModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('./view/view.module').then((m) => m.ViewModule),
      },
      {
        path: 'edit',
        loadChildren: () =>
          import('./edit/edit.module').then((m) => m.EditModule),
      },
      {
        path: 'create',
        loadChildren: () =>
          import('./create/create.module').then((m) => m.CreateModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentasRoutingModule {}
