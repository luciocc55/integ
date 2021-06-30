import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { TranslocoModule } from '@ngneat/transloco';
import { MergeosModule } from 'src/app/components/mergeos/mergeos.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GlobalesModule } from 'src/app/components/globales/globales.module';
import { OsComponent } from './os.component';

const routes: Routes = [
  {
    path: '',
    component: OsComponent,
  },
];

@NgModule({
  declarations: [OsComponent],
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
export class OsModule {}
