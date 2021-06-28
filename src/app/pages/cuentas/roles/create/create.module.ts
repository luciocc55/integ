import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { GlobalesModule } from 'src/app/components/globales/globales.module';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateComponent } from './create.component';
import { CuentasModule } from 'src/app/components/cuentas/cuentas.module';

const routes: Routes = [
  {
    path: '',
    component: CreateComponent,
  },
];

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    GlobalesModule,
    SharedModule,
    TranslocoModule,
    CuentasModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([]),
  ],
  providers: [],
})
export class CreateModule {}
