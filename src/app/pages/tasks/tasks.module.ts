import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { GlobalesModule } from 'src/app/components/globales/globales.module';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'src/app/shared/shared.module';
import { TasksComponent } from './tasks.component';
import { TasksState } from 'src/app/store/tasks/tasks.state';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
  },
];

@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule,
    GlobalesModule,
    SharedModule,
    TranslocoModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([TasksState]),
  ],
  providers: [],
})
export class TasksModule {}
