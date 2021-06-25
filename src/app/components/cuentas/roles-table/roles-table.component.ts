import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Roles } from 'src/app/store/cuentas/cuentas.state';
import { Pagination } from 'src/app/utility/interfaces/pagination.interface';

@Component({
  selector: 'app-roles-table',
  templateUrl: './roles-table.component.html',
  styleUrls: ['./roles-table.component.scss'],
})
export class RolesTableComponent implements OnInit {
  dataSource!: MatTableDataSource<Roles>;
  displayedColumns: string[] = ['descripcion','id'];
  @Select((state: any) => state.cuentas.pagination)
  pagination$!: Observable<Pagination>;
  @Select((state: any) => state.cuentas.roles)
  roles$!: Observable<Roles[]>;
  @Output() paginacion = new EventEmitter<any>(false);
  @Output() evento = new EventEmitter<any>(false);
  @Input() columns!: string[];
  constructor() {}

  ngOnInit(): void {
    this.roles$.subscribe((items: Roles[]) => {
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
