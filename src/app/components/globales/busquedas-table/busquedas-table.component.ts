import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Busquedas } from 'src/app/store/busquedas/busquedas.state';
import { Pagination } from 'src/app/utility/interfaces/pagination.interface';

@Component({
  selector: 'app-busquedas-table',
  templateUrl: './busquedas-table.component.html',
  styleUrls: ['./busquedas-table.component.scss'],
})
export class BusquedasTableComponent implements OnInit {
  dataSource!: MatTableDataSource<Busquedas>;
  displayedColumns: string[] = ['id', 'descripcion', 'origen', 'acciones'];
  @Select((state: any) => state.busquedas.pagination)
  pagination$!: Observable<Pagination>;
  @Select((state: any) => state.busquedas.resultados)
  resultados$!: Observable<Busquedas[]>;
  @Output() paginacion = new EventEmitter<any>(false);
  @Output() evento = new EventEmitter<any>(false);
  @Input() icon!: string;
  constructor() {}

  ngOnInit(): void {
    this.resultados$.subscribe((items: Busquedas[]) => {
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
  actionEvent(idRegistro: number) {
    this.evento.emit(idRegistro);
  }
}
