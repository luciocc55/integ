import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DireccionesComponent } from './direcciones.component';

const routes: Routes = [
  {
    path: '',
    component: DireccionesComponent,
    children: [
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentasRoutingModule {}
