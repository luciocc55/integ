import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { MatcheosRoutingModule } from './matcheos-routing.module';
import { MatcheosComponent } from './matcheos.component';
import { MatcheosState } from 'src/app/store/matcheos/matcheos.state';
import { ParamsState } from 'src/app/store/params/params.state';

@NgModule({
  declarations: [MatcheosComponent],
  imports: [
    CommonModule,
    MatcheosRoutingModule,
    NgxsModule.forFeature([MatcheosState,ParamsState]),
  ],
})
export class MatchearModule {}
