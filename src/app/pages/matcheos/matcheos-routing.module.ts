import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatcheosComponent } from './matcheos.component';

const routes: Routes = [
  {
    path: '',
    component: MatcheosComponent,
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
      {
        path: 'pacientes',
        data: { state: 'pacientes' },
        loadChildren: () =>
          import('./pacientes/pacientes.module').then(
            (m) => m.PacientesModule
          ),
      },
      {
        path: 'os',
        data: { state: 'os' },
        loadChildren: () =>
          import('./os/os.module').then(
            (m) => m.OsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatcheosRoutingModule {}
