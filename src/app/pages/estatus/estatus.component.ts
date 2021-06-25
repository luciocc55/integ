import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EstatusActions } from 'src/app/store/estatus/estatus.actions';
import { Estatus } from 'src/app/store/estatus/estatus.state';

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
}
