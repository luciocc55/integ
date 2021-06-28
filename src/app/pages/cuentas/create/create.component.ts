import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResetForm } from '@ngxs/form-plugin';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CuentasActions } from 'src/app/store/cuentas/cuentas.actions';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  @Select((state: any) => state.cuentas.newUsuarioForm.status)
  statusForm$!: Observable<string>;
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {}
  crearUsuario() {
    const valid = this.store.selectSnapshot(
      (state) => state.cuentas.newUsuarioForm
    );
    if (valid.status === 'VALID') {
      this.store.dispatch(new CuentasActions.CreateUsuario()).subscribe(() => {
        this.router.navigate(['./cuentas']);
        this.store.dispatch(
          new ResetForm({
            path: 'cuentas.newUsuarioForm',
          })
        );
      });
    }
  }
}
