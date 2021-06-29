import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DireccionesActions } from 'src/app/store/direcciones/direcciones.actions';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, AfterViewInit {
  @Select((state: any) => state.direcciones.direccionForm?.status)
  statusForm$!: Observable<string>;
  @ViewChild('editDialog')
  editDialog!: TemplateRef<any>;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}
  ngAfterViewInit(): void {
    const dialogRef = this.dialog.open(this.editDialog, {
      panelClass: 'customModal',
      width: '100%',
      height: '80%',
      data: {},
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const direccion = params.get('direccion');
      if (direccion) {
        this.store.dispatch(new DireccionesActions.LoadDireccion(direccion));
      } else {
        this.router.navigate(['../'], {
          relativeTo: this.route,
        });
      }
    });
  }
  close() {
    this.dialog.closeAll();
  }
  editarDir() {
    this.store
      .dispatch(new DireccionesActions.EditarDireccion())
      .subscribe(() => {
        this.close();
      });
  }
}
