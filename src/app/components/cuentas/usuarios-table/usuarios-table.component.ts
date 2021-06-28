import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Usuarios } from 'src/app/store/cuentas/cuentas.state';
import { Pagination } from 'src/app/utility/interfaces/pagination.interface';

@Component({
  selector: 'app-usuarios-table',
  templateUrl: './usuarios-table.component.html',
  styleUrls: ['./usuarios-table.component.scss']
})
export class UsuariosTableComponent implements OnInit {
  dataSource!: MatTableDataSource<Usuarios>;
  displayedColumns: string[] = ['usuario','rol','nombre','apellido'];
  @Select((state: any) => state.cuentas.pagination)
  pagination$!: Observable<Pagination>;
  @Select((state: any) => state.cuentas.usuarios)
  usuarios$!: Observable<Usuarios[]>;
  @Output() paginacion = new EventEmitter<any>(false);
  @Output() evento = new EventEmitter<any>(false);
  @Input() columns!: string[];
  constructor() {}

  ngOnInit(): void {
    this.usuarios$.subscribe((items: Usuarios[]) => {
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
