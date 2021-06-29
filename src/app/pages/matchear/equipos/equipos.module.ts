import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { TranslocoModule } from '@ngneat/transloco';
import { MergeosModule } from 'src/app/components/mergeos/mergeos.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GlobalesModule } from 'src/app/components/globales/globales.module';
import { EquiposComponent } from './equipos.component';

const routes: Routes = [
  {
    path: '',
    component: EquiposComponent,
  },
];

@NgModule({
  declarations: [EquiposComponent],
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
export class EquiposModule {}
