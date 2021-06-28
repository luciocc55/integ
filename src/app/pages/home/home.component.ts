import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GlobalActions } from 'src/app/store/global/global.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Select((state: any) => state.global.sideExpanded)
  sideExpanded$!: Observable<boolean>;
  constructor(private store: Store) { }

  ngOnInit(): void {
  }
  openStart() {
    this.store.dispatch(new GlobalActions.ChangeSideMode())
  }
}
