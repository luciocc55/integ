import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { TranslocoModule } from '@ngneat/transloco';
import { ProfesionalesComponent } from './profesionales.component';
import { MergeosModule } from 'src/app/components/mergeos/mergeos.module';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ProfesionalesComponent,
  },
];

@NgModule({
  declarations: [ProfesionalesComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    MergeosModule,
    SharedModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([]),
  ],
  providers: [],
})
export class ProfesionalesModule {}
