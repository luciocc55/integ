import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @Select((state: any) => state.cuentas.newUsuarioForm.status)
  statusForm$!: Observable<string>;
  constructor(private store: Store) { }

  ngOnInit(): void {
  }
  crearUsuario() {
    console.log(this.store.selectSnapshot(state=> state.cuentas.newUsuarioForm))
  }
}
