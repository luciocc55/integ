import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Relacion } from 'src/app/store/relaciones/relaciones.state';
import { Pagination } from 'src/app/utility/interfaces/pagination.interface';
import { ToastPreguntaService } from 'src/app/utility/toastPregunta.service';

@Component({
  selector: 'app-relaciones-table',
  templateUrl: './relaciones-table.component.html',
  styleUrls: ['./relaciones-table.component.scss']
})
export class RelacionesTableComponent implements OnInit {
  dataSource!: MatTableDataSource<Relacion>;
  displayedColumns: string[] = [
    'id',
    'idOrigen',
    'descripcion',
    'origen',
    'acciones',
  ];
  @Select((state: any) => state.relaciones.resultados)
  relaciones$!: Observable<Relacion[]>;
  @Select((state: any) => state.relaciones.pagination)
  pagination$!: Observable<Pagination>;
  @Output() paginacion = new EventEmitter<any>(false);
  @Output() deleteRelacion = new EventEmitter<any>(false);
  constructor(private preguntaService: ToastPreguntaService) {}

  ngOnInit(): void {
    this.relaciones$.subscribe((items: Relacion[]) => {
      this.dataSource = new MatTableDataSource(items);
    });
  }
  handlePageEvent(event: any) {
    if (event) {
      const pageSize = event.pageSize;
      const page = event.pageIndex + 1;
      this.paginacion.emit({ page, pageSize });
    }
  }
  removeRelacion(idRelacion: number) {
    const ref = this.preguntaService.openStandard();
    const subscription: Subscription = ref.instance.decision.subscribe(
      (value) => {
        if (value) {
          this.deleteRelacion.emit(idRelacion);
        }
        subscription.remove(subscription);
      }
    );
  }
}
