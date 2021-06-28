import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatcheosTableComponent } from './matcheos-table/matcheos-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MatcheosTableComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslocoModule,
    RouterModule,
  ],
  exports: [
    MatcheosTableComponent,
  ]
})
export class MatcheosModule { }
