import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EstadisticasActions } from 'src/app/store/estadisticas/estadisticas.actions';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
})
export class EstadisticasComponent implements OnInit {
  @Select((state: any) => state.estadisticas.equipos)
  equipos$!: Observable<any>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch([
      new EstadisticasActions.LoadEquipos(),
      new EstadisticasActions.LoadDirecciones()
    ]);
  }
}
