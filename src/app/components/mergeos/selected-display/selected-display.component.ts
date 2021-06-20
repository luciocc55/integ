import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MergeosActions } from 'src/app/store/mergeos/mergeos.actions';
import { ToMerge } from 'src/app/store/mergeos/mergeos.state';

@Component({
  selector: 'app-selected-display',
  templateUrl: './selected-display.component.html',
  styleUrls: ['./selected-display.component.scss']
})
export class SelectedDisplayComponent implements OnInit {
  @Select((state: any) => state.mergeos.selected)
  selected$!: Observable<ToMerge[]>;
  constructor(private store: Store) { }

  ngOnInit(): void {
  }
  unselect(itemId: number) {
      this.store.dispatch(new MergeosActions.UnSelectItem(itemId));
  }
  selectMaster(id: number, bool: boolean) {
    if (bool) {
      this.store.dispatch(new MergeosActions.SelectMaster(id));
    } else {
      this.store.dispatch(new MergeosActions.UnSelectMaster(id));
    }
  }

}
