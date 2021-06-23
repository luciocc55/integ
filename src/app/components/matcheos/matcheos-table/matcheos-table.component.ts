import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Matcheados, Pagination } from 'src/app/store/matcheos/matcheos.state';
import { ToastPreguntaComponent } from '../../globales/toast-pregunta/toast-pregunta.component';

@Component({
  selector: 'app-matcheos-table',
  templateUrl: './matcheos-table.component.html',
  styleUrls: ['./matcheos-table.component.scss'],
})
export class MatcheosTableComponent implements OnInit {
  dataSource!: MatTableDataSource<Matcheados>;
  displayedColumns: string[] = [
    'master',
    'id',
    'descripcion',
    'origen',
    'acciones',
  ];
  detail = 'expandedDetail';
  @Select((state: any) => state.matcheos.matcheos)
  matcheados$!: Observable<Matcheados[]>;
  @Select((state: any) => state.matcheos.pagination)
  pagination$!: Observable<Pagination>;
  @Output() paginacion = new EventEmitter<any>(false);
  @Output() deletedMaster = new EventEmitter<any>(false);
  @Output() unMatch = new EventEmitter<any>(false);
  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.matcheados$.subscribe((items: Matcheados[]) => {
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
  deleteMaster(idMaster: number) {
    const ref = this.pregunta();
    const subscription: Subscription = ref.instance.decision.subscribe(
      (value) => {
        if (value) {
          this.deletedMaster.emit(idMaster);
        }
        subscription.remove(subscription);
      }
    );
  }
  desMatchProf(idMatch: number) {
    const ref = this.pregunta();
    const subscription: Subscription = ref.instance.decision.subscribe(
      (value) => {
        if (value) {
          this.unMatch.emit(idMatch);
        }
        subscription.remove(subscription);
      }
    );
  }
  pregunta() {
    const ref = this.snackBar.openFromComponent(ToastPreguntaComponent, {
      data: {
        headerClass: 'bg-yellow-500 text-white',
        header: 'toast.confirmacion',
        texto: 'toast.preguntaOperacion',
      },
      panelClass: ['mobile:w-full', 'shadow-none'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
    return ref;
  }
}
