import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CuentasActions } from 'src/app/store/cuentas/cuentas.actions';
import { Roles } from 'src/app/store/cuentas/cuentas.state';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  @Select((state: any) => state.cuentas.rol)
  rol$!: Observable<Roles>;
  idRol!: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const rol = params.get('rol');
      if (rol) {
        if (this.idRol !== rol) {
          this.idRol = rol;
          this.store.dispatch(new CuentasActions.LoadRol(this.idRol));
        }
      } else {
        this.router.navigate(['../'], {
          relativeTo: this.route,
        });
      }
    });
  }
  editarRol() {
    this.store.dispatch(new CuentasActions.EditRol());
  }
}
