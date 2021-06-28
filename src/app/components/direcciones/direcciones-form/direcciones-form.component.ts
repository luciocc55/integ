import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UpdateFormStatus, UpdateFormValue } from '@ngxs/form-plugin';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-direcciones-form',
  templateUrl: './direcciones-form.component.html',
  styleUrls: ['./direcciones-form.component.scss']
})
export class DireccionesFormComponent implements OnInit {
  @Select((state: any) => state.direcciones.direccionForm?.dirty)
  dirty$!: Observable<boolean>;
  @Select((state: any) => state.direcciones.direccionForm?.model)
  value$!: Observable<any>;
  direccionForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.direccionForm = this.formBuilder.group({
      sinonimo: [''],
      institucion: [''],
      idGoRed: [''],
    });
    this.direccionForm.valueChanges.subscribe(() => {
      const storeValue = this.store.selectSnapshot(
        (state) => state.direcciones.direccionForm.model
      );
      const formValue = this.direccionForm.value;
      if (JSON.stringify(formValue) !== JSON.stringify(storeValue)) {
        this.store.dispatch(
          new UpdateFormValue({
            value: formValue,
            path: 'direcciones.direccionForm',
          })
        );
      }
      if (this.direccionForm.valid) {
        this.store.dispatch(
          new UpdateFormStatus({
            status: 'VALID',
            path: 'direcciones.direccionForm',
          })
        );
      }
    });
    this.dirty$.subscribe((info) => {
      if (info) {
        this.direccionForm.markAllAsTouched();
      }
    });
    this.value$.subscribe((datos) => {
      if (datos) {
        this.direccionForm.patchValue(datos, { emitEvent: false });
      }
    });
  }
}
