import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatcheosModule } from 'src/app/components/matcheos/matcheos.module';
import { EditComponent } from './edit.component';
import { BusquedasState } from 'src/app/store/busquedas/busquedas.state';
import { GlobalesModule } from 'src/app/components/globales/globales.module';

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
    TranslocoModule,
    SharedModule,
    GlobalesModule,
    MatcheosModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([BusquedasState]),
  ],
  providers: [],
})
export class EditModule {}
