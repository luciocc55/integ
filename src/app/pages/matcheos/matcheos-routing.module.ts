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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatcheosRoutingModule {}
