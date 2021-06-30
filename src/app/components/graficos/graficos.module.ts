import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MergeosGraficoComponent } from './mergeos-grafico/mergeos-grafico.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    MergeosGraficoComponent
  ],
  imports: [
    CommonModule,
    NgxChartsModule,
  ]
})
export class GraficosModule { }
