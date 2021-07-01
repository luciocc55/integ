import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MergeosGraficoComponent } from './mergeos-grafico/mergeos-grafico.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TranslocoModule } from '@ngneat/transloco';


@NgModule({
  declarations: [
    MergeosGraficoComponent
  ],
  imports: [
    CommonModule,
    NgxChartsModule,
    TranslocoModule
  ],
  exports: [
    MergeosGraficoComponent
  ]
})
export class GraficosModule { }
