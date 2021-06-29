import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { TranslocoModule } from '@ngneat/transloco';
import { MergeosModule } from 'src/app/components/mergeos/mergeos.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GlobalesModule } from 'src/app/components/globales/globales.module';
import { EspecialidadesComponent } from './especialidades.component';

const routes: Routes = [
  {
    path: '',
    component: EspecialidadesComponent,
  },
];

@NgModule({
  declarations: [EspecialidadesComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    MergeosModule,
    SharedModule,
    GlobalesModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([]),
  ],
  providers: [],
})
export class EspecialidadesModule {}
