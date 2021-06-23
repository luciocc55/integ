import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchearComponent } from './matchear.component';
import { MatchearRoutingModule } from './matchear-routing.module';
import { MergeosState } from 'src/app/store/mergeos/mergeos.state';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [MatchearComponent],
  imports: [
    CommonModule,
    MatchearRoutingModule,
    NgxsModule.forFeature([MergeosState]),
  ],
})
export class MatchearModule {}
