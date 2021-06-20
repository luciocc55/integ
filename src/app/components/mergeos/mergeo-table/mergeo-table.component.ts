import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MergeosActions } from 'src/app/store/mergeos/mergeos.actions';
import { Pagination, ToMerge } from 'src/app/store/mergeos/mergeos.state';

@Component({
  selector: 'app-mergeo-table',
  templateUrl: './mergeo-table.component.html',
  styleUrls: ['./mergeo-table.component.scss'],
})
export class MergeoTableComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'select',
    'id',
    'descripcion',
    'origen',
    'acciones',
  ];
  @Select((state: any) => state.mergeos.toMerge)
  toMerge$!: Observable<ToMerge[]>;
  @Select((state: any) => state.mergeos.selected)
  selected$!: Observable<ToMerge[]>;
  @Select((state: any) => state.mergeos.pagination)
  pagination$!: Observable<Pagination>;
  itemsSelected: ToMerge[] = [];
  @Output() delete = new EventEmitter<any>(false);
  @Output() paginacion = new EventEmitter<any>(false);
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.toMerge$.subscribe((items) => {
      this.dataSource = new MatTableDataSource(items);
    });
    this.selected$.subscribe((selected) => {
      this.itemsSelected = selected;
    });
  }
  selectItem(evento: any, itemId: number) {
    const bool = evento.checked;
    if (bool) {
      this.store.dispatch(new MergeosActions.SelectItem(itemId));
    } else {
      this.store.dispatch(new MergeosActions.UnSelectItem(itemId));
    }
  }
  deleteItem(id: number) {
    this.delete.emit(id);
  }
  handlePageEvent(event:any){
    if (event) {
      const pageSize = event.pageSize
      const page = event.pageIndex + 1
      this.paginacion.emit({page, pageSize})
    }
  }
  selectMaster(id: number, bool: boolean) {
    if (bool) {
      this.store.dispatch(new MergeosActions.SelectMaster(id));
    } else {
      this.store.dispatch(new MergeosActions.UnSelectMaster(id));
    }
  }
}