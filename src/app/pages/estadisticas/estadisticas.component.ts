import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EstadisticasActions } from 'src/app/store/estadisticas/estadisticas.actions';
import { EstadisticasDefault } from 'src/app/store/estadisticas/estadisticas.state';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
})
export class EstadisticasComponent implements OnInit {
  @Select((state: any) => state.estadisticas.equipos)
  equipos$!: Observable<EstadisticasDefault>;
  @Select((state: any) => state.estadisticas.profesionales)
  profesionales$!: Observable<EstadisticasDefault>;
  @Select((state: any) => state.estadisticas.pacientes)
  pacientes$!: Observable<EstadisticasDefault>;
  @Select((state: any) => state.estadisticas.estudios)
  estudios$!: Observable<EstadisticasDefault>;
  @Select((state: any) => state.estadisticas.especialidades)
  especialidades$!: Observable<EstadisticasDefault>;
  @Select((state: any) => state.estadisticas.direcciones)
  direcciones$!: Observable<any>;
  @Select((state: any) => state.estadisticas.os)
  os$!: Observable<EstadisticasDefault>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch([
      new EstadisticasActions.LoadEquipos(),
      new EstadisticasActions.LoadPacientes(),
      new EstadisticasActions.LoadProfesionales(),
      new EstadisticasActions.LoadEspecialidades(),
      new EstadisticasActions.LoadEstudios(),
      new EstadisticasActions.LoadOs(),
      new EstadisticasActions.LoadDirecciones()
    ]);
  }
}
