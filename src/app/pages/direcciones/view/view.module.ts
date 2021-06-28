import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { GlobalesModule } from 'src/app/components/globales/globales.module';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'src/app/shared/shared.module';
import { DireccionesState } from 'src/app/store/direcciones/direcciones.state';
import { ParamsState } from 'src/app/store/params/params.state';
import { DireccionesComponentsModule } from 'src/app/components/direcciones/direcciones.module';
import { ViewComponent } from './view.component';

const routes: Routes = [
  {
    path: '',
    component: ViewComponent,
  },
];

@NgModule({
  declarations: [ViewComponent],
  imports: [
    CommonModule,
    GlobalesModule,
    SharedModule,
    TranslocoModule,
    DireccionesComponentsModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([ParamsState]),
  ],
  providers: [],
})
export class ViewModule {}
