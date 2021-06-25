import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { GlobalesModule } from 'src/app/components/globales/globales.module';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'src/app/shared/shared.module';
import { EstatusComponent } from './estatus.component';
import { EstatusState } from 'src/app/store/estatus/estatus.state';
import { LocalizedDatePipe } from 'src/app/utility/pipes/date-localized.pipe';

const routes: Routes = [
  {
    path: '',
    component: EstatusComponent,
  },
];

@NgModule({
  declarations: [EstatusComponent, LocalizedDatePipe],
  imports: [
    CommonModule,
    GlobalesModule,
    SharedModule,
    TranslocoModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([EstatusState]),
  ],
  providers: [],
})
export class EstatusModule {}
