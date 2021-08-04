import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { GlobalesModule } from 'src/app/components/globales/globales.module';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'src/app/shared/shared.module';
import { EquiposEstudiosComponent } from './equipos-estudios.component';
import { RelacionesComponentsModule } from 'src/app/components/relaciones-components/relaciones-components.module';

const routes: Routes = [
  {
    path: '',
    component: EquiposEstudiosComponent,
  },
];

@NgModule({
  declarations: [EquiposEstudiosComponent],
  imports: [
    CommonModule,
    GlobalesModule,
    SharedModule,
    TranslocoModule,
    RelacionesComponentsModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([]),
  ],
  providers: [],
})
export class EquiposEstudiosModule {}
