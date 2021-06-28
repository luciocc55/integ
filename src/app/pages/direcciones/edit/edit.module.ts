import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'src/app/shared/shared.module';
import { DireccionesComponentsModule } from 'src/app/components/direcciones/direcciones.module';
import { EditComponent } from './edit.component';

const routes: Routes = [
  {
    path: '',
    component: EditComponent,
  },
];

@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    SharedModule,
    TranslocoModule,
    DireccionesComponentsModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([]),
  ],
  providers: [],
})
export class EditModule {}
