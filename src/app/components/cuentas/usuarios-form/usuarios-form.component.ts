import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UpdateFormStatus, UpdateFormValue } from '@ngxs/form-plugin';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CuentasActions } from 'src/app/store/cuentas/cuentas.actions';
import { Roles } from 'src/app/store/cuentas/cuentas.state';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss'],
})
export class UsuariosFormComponent implements OnInit {
  @Select((state: any) => state.cuentas.newUsuarioForm.dirty)
  dirty$!: Observable<boolean>;
  @Select((state: any) => state.cuentas.newUsuarioForm.model)
  value$!: Observable<any>;
  @Select((state: any) => state.cuentas.roles)
  roles$!: Observable<Roles[]>;
  usuariosForm!: FormGroup;
  searchSelect: FormControl = new FormControl('');
  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new CuentasActions.LoadAllRoles());
    this.usuariosForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      role: ['', Validators.required],
    });
    this.usuariosForm.valueChanges.subscribe(() => {
      const storeValue = this.store.selectSnapshot(
        (state) => state.cuentas.newUsuarioForm.model
      );
      const formValue = this.usuariosForm.value;
      if (JSON.stringify(formValue) !== JSON.stringify(storeValue)) {
        this.store.dispatch(
          new UpdateFormValue({
            value: formValue,
            path: 'cuentas.newUsuarioForm',
          })
        );
      }
      if (this.usuariosForm.valid) {
        this.store.dispatch(
          new UpdateFormStatus({
            status: 'VALID',
            path: 'cuentas.newUsuarioForm',
          })
        );
      }
    });
    this.dirty$.subscribe((info) => {
      if (info) {
        this.usuariosForm.markAllAsTouched();
      }
    });
    this.value$.subscribe((datos) => {
      if (datos) {
        this.usuariosForm.patchValue(datos, { emitEvent: false });
      }
    });
  }
}
