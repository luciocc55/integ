import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CuentasActions } from 'src/app/store/cuentas/cuentas.actions';
import { Usuarios } from 'src/app/store/cuentas/cuentas.state';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  @Select((state: any) => state.cuentas.newUsuarioForm.status)
  statusForm$!: Observable<string>;
  @Select((state: any) => state.cuentas.usuario)
  usuario$!: Observable<Usuarios>;
  idUsuario!: string;
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const usuario = params.get('usuario');
      if (usuario) {
        if (this.idUsuario !== usuario) {
          this.idUsuario = usuario;
          this.store.dispatch(new CuentasActions.LoadUsuario(this.idUsuario));
        }
      } else {
        this.router.navigate(['../'], {
          relativeTo: this.route,
        });
      }
    });
  }
  editarUsuario() {}
}
