import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CuentasActions } from 'src/app/store/cuentas/cuentas.actions';
import { Roles } from 'src/app/store/cuentas/cuentas.state';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  @Select((state: any) => state.cuentas.rol)
  rol$!: Observable<Roles>;
  idRol!: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      new CuentasActions.UpdateState({
        rol: { _id: '', descripcion: '', permissions: [] },
      })
    );
  }
  createRol() {
    this.store.dispatch(new CuentasActions.CreateRol()).subscribe(() => {
      this.router.navigate(['./cuentas/roles']);
    });
  }
}
