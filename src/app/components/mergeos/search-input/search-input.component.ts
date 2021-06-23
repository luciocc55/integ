import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MergeosActions } from 'src/app/store/mergeos/mergeos.actions';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit {
  search: FormControl = new FormControl('');
  @Select((state: any) => state.mergeos.searchString)
  search$!: Observable<string>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.search$.subscribe((value) => {
      this.search.patchValue(value);
    });
  }
  buscar() {
    this.store.dispatch(new MergeosActions.UpdateSearch(this.search.value));
  }
}
