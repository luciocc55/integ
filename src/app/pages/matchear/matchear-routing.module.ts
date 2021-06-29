import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchearComponent } from './matchear.component';

const routes: Routes = [
  {
    path: '',
    component: MatchearComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'profesionales' },
      {
        path: 'profesionales',
        data: { state: 'profesionales' },
        loadChildren: () =>
          import('./profesionales/profesionales.module').then(
            (m) => m.ProfesionalesModule
          ),
      },
      {
        path: 'especialidades',
        data: { state: 'especialidades' },
        loadChildren: () =>
          import('./especialidades/especialidades.module').then(
            (m) => m.EspecialidadesModule
          ),
      },
      {
        path: 'equipos',
        data: { state: 'equipos' },
        loadChildren: () =>
          import('./equipos/equipos.module').then(
            (m) => m.EquiposModule
          ),
      },
      {
        path: 'estudios',
        data: { state: 'estudios' },
        loadChildren: () =>
          import('./estudios/estudios.module').then(
            (m) => m.EstudiosModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchearRoutingModule {}
