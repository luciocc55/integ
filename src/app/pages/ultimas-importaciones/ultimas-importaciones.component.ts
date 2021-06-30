import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BusquedasActions } from 'src/app/store/busquedas/busquedas.actions';
import { BusquedasCreated } from 'src/app/store/busquedas/busquedas.state';

@Component({
  selector: 'app-ultimas-importaciones',
  templateUrl: './ultimas-importaciones.component.html',
  styleUrls: ['./ultimas-importaciones.component.scss'],
})
export class UltimasImportacionesComponent implements OnInit {
  @Select((state: any) => state.busquedas.profesionales)
  profesionales$!: Observable<BusquedasCreated[]>;
  @Select((state: any) => state.busquedas.estudios)
  estudios$!: Observable<BusquedasCreated[]>;
  @Select((state: any) => state.busquedas.especialidades)
  especialidades$!: Observable<BusquedasCreated[]>;
  @Select((state: any) => state.busquedas.equipos)
  equipos$!: Observable<BusquedasCreated[]>;
  @Select((state: any) => state.busquedas.os)
  os$!: Observable<BusquedasCreated[]>;
  @Select((state: any) => state.busquedas.pacientes)
  pacientes$!: Observable<BusquedasCreated[]>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch([
      new BusquedasActions.UltimosProfesionales(),
      new BusquedasActions.UltimosEquipos(),
      new BusquedasActions.UltimosEspecialidades(),
      new BusquedasActions.UltimosEstudios(),
      new BusquedasActions.UltimosOs(),
      new BusquedasActions.UltimosPacientes(),
    ]);
  }
}
