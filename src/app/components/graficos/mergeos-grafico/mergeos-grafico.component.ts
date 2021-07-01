import { Component, Input, OnInit } from '@angular/core';
import { Estadisticas } from 'src/app/utility/interfaces/estadisticas';

@Component({
  selector: 'app-mergeos-grafico',
  templateUrl: './mergeos-grafico.component.html',
  styleUrls: ['./mergeos-grafico.component.scss']
})
export class MergeosGraficoComponent implements OnInit {
  @Input() data!:Estadisticas;
  @Input() total!:number;
  colorScheme = {
    domain: ['#0070a7', '#e9f8ff', '#466974', '#536a71']
  };
  view: [number,number] = [225, 225];
  constructor() { }

  ngOnInit(): void {
  }

}
