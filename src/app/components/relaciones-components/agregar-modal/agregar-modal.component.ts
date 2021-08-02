import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RelacionesActions } from 'src/app/store/relaciones/relaciones.actions';
import { Busquedas, Registro } from 'src/app/store/relaciones/relaciones.state';

@Component({
  selector: 'app-agregar-modal',
  templateUrl: './agregar-modal.component.html',
  styleUrls: ['./agregar-modal.component.scss'],
})
export class AgregarModalComponent implements OnInit {
  search1: FormControl = new FormControl('');
  search2: FormControl = new FormControl('');
  resultados1!: Busquedas;
  resultados2!: Busquedas;
  @Output() eventoBuscar1 = new EventEmitter<any>(false);
  @Output() eventoBuscar2 = new EventEmitter<any>(false);
  @Output() guardarRelaciones = new EventEmitter<any>(false);
  @Select((state: any) => state.relaciones.selected1)
  selected$!: Observable<Registro>;
  @Select((state: any) => state.relaciones.selected2)
  selecteds$!: Observable<Registro[]>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select((state) => state.relaciones?.busqueda1)
      .subscribe((data: Busquedas) => {
        if (data?.value && data.value !== this.search1.value) {
          this.search1.setValue(data.value, { emitEvent: false });
        }
        this.resultados1 = data;
      });
    this.store
      .select((state) => state.relaciones?.busqueda2)
      .subscribe((data) => {
        if (data?.value && data?.value !== this.search2.value) {
          this.search2.setValue(data.value, { emitEvent: false });
        }
        this.resultados2 = data;
      });
  }
  buscar1() {
    this.store.dispatch(
      new RelacionesActions.UpdateState({
        busqueda1: { value: this.search1.value },
      })
    );
    this.eventoBuscar1.emit(true);
  }
  add1(item: Registro) {
    this.store.dispatch(
      new RelacionesActions.UpdateState({
        selected1: item,
      })
    );
  }
  add2(item: Registro) {
    this.store.dispatch(new RelacionesActions.Add(item));
  }
  delete(item: Registro) {
    this.store.dispatch(new RelacionesActions.Remove(item));
  }
  clearAll() {
    this.store.dispatch(
      new RelacionesActions.UpdateState({
        selected2: [],
        selected1: null,
      })
    );
  }
  guardar() {
    this.guardarRelaciones.emit(true);
  }
  buscar2() {
    this.store.dispatch(
      new RelacionesActions.UpdateState({
        busqueda2: { value: this.search2.value },
      })
    );
    this.eventoBuscar2.emit(true);
  }
}
