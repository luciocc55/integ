import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { GlobalesModule } from 'src/app/components/globales/globales.module';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'src/app/shared/shared.module';
import { RolesComponent } from './roles.component';
import { RolesRoutingModule } from './roles-routing.module';

@NgModule({
  declarations: [RolesComponent],
  imports: [
    CommonModule,
    GlobalesModule,
    SharedModule,
    TranslocoModule,
    RolesRoutingModule,
    NgxsModule.forFeature([]),
  ],
  providers: [],
})
export class RolesModule {}
