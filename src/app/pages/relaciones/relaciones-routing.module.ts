import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RelacionesComponent } from './relaciones.component';

const routes: Routes = [
  {
    path: '',
    component: RelacionesComponent,
    children: [
      {
        path: 'profesionales-especialidades',
        data: { state: 'profesionales-especialidades' },
        loadChildren: () =>
          import(
            './profesionales-especialidades/profesionales-especialidades.module'
          ).then((m) => m.ProfesionalesEspecialidadesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelacionesRoutingModule {}
