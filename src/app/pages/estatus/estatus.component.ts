import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EstatusActions } from 'src/app/store/estatus/estatus.actions';
import { Estatus } from 'src/app/store/estatus/estatus.state';
import { GlobalActions } from 'src/app/store/global/global.actions';

@Component({
  selector: 'app-estatus',
  templateUrl: './estatus.component.html',
  styleUrls: ['./estatus.component.scss'],
})
export class EstatusComponent implements OnInit {
  @Select((state: any) => state.estatus.estatus)
  estatus$!: Observable<Estatus[]>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new EstatusActions.LoadEstatus());
  }
  changeHabilit(estatus: number, value: boolean) {
    this.store.dispatch(new EstatusActions.UpdateEstatus(estatus, value));
  }
  copied() {
    this.store.dispatch(new GlobalActions.OpenSuccess('copiado'));
  }
}
