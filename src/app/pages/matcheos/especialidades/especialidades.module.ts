import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { TranslocoModule } from '@ngneat/transloco';
import { EspecialidadesComponent } from './especialidades.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatcheosModule } from 'src/app/components/matcheos/matcheos.module';

const routes: Routes = [
  {
    path: '',
    component: EspecialidadesComponent,
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
  declarations: [EspecialidadesComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    SharedModule,
    MatcheosModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([]),
  ],
  providers: [],
})
export class EspecialidadesModule {}
