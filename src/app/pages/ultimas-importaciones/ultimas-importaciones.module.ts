import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { GlobalesModule } from 'src/app/components/globales/globales.module';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'src/app/shared/shared.module';
import { UltimasImportacionesComponent } from './ultimas-importaciones.component';
import { BusquedasState } from 'src/app/store/busquedas/busquedas.state';

const routes: Routes = [
  {
    path: '',
    component: UltimasImportacionesComponent,
  },
];

@NgModule({
  declarations: [UltimasImportacionesComponent],
  imports: [
    CommonModule,
    GlobalesModule,
    SharedModule,
    TranslocoModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([BusquedasState]),
  ],
  providers: [],
})
export class UltimasImportacionesModule {}
