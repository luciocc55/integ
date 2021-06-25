import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { GlobalesModule } from 'src/app/components/globales/globales.module';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewComponent } from './view.component';
import { CuentasState } from 'src/app/store/cuentas/cuentas.state';
import { CuentasModule } from 'src/app/components/cuentas/cuentas.module';

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
    CuentasModule,
    TranslocoModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([CuentasState]),
  ],
  providers: [],
})
export class ViewModule {}
