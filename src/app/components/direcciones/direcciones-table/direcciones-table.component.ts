import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Roles } from 'src/app/store/cuentas/cuentas.state';
import { Pagination } from 'src/app/utility/interfaces/pagination.interface';

@Component({
  selector: 'app-direcciones-table',
  templateUrl: './direcciones-table.component.html',
  styleUrls: ['./direcciones-table.component.scss']
})
export class DireccionesTableComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['sinonimo','real','gored', 'institucion'];
  @Select((state: any) => state.direcciones.pagination)
  pagination$!: Observable<Pagination>;
  @Select((state: any) => state.direcciones.direcciones)
  direcciones$!: Observable<any[]>;
  @Output() paginacion = new EventEmitter<any>(false);
  @Output() evento = new EventEmitter<any>(false);
  @Input() columns: string[] = [];
  constructor() {}

  ngOnInit(): void {
    this.direcciones$.subscribe((items: any[]) => {
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
