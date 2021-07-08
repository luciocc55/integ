import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CuentasActions } from 'src/app/store/cuentas/cuentas.actions';
import { Permisos, Roles } from 'src/app/store/cuentas/cuentas.state';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.scss'],
})
export class RolesFormComponent implements OnInit {
  @Select((state: any) => state.cuentas.rol)
  rol$!: Observable<Roles>;
  @Select((state: any) => state.cuentas.permisos)
  permisosSelect$!: Observable<Permisos[]>;
  descripcion: FormControl = new FormControl('', Validators.required);
  searchSelect: FormControl = new FormControl('');
  nuevosPermisos: FormControl = new FormControl([]);
  permisos!: Permisos[];
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new CuentasActions.LoadPermisos(''));
    this.searchSelect.valueChanges.subscribe((value) => {
      if (value) {
        this.store.dispatch(new CuentasActions.LoadPermisos(value));
      }
    });
    this.descripcion.valueChanges.subscribe((value) => {
      const stateRol = this.store.selectSnapshot((state) => state.cuentas.rol);
      this.store.dispatch(
        new CuentasActions.UpdateState({
          rol: { ...stateRol, descripcion: value },
        })
      );
    });
    this.rol$.subscribe((value) => {
      if (value !== this.descripcion.value) {
        this.descripcion.setValue(value.descripcion, { emitEvent: false });
      }
      this.permisos = value.permissions;
    });
    this.nuevosPermisos.valueChanges.subscribe((data) => {
      this.store.dispatch(new CuentasActions.AddPermiso(data));
      this.nuevosPermisos.setValue(null, { emitEvent: false });
    });
  }
  removePermiso(idPermiso: string) {
    this.store.dispatch(new CuentasActions.RemovePermiso(idPermiso));
  }
}
