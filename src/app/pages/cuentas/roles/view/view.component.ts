import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CuentasActions } from 'src/app/store/cuentas/cuentas.actions';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new CuentasActions.LoadRoles('1','25'))
  }
  nuevoRol() {}
}
