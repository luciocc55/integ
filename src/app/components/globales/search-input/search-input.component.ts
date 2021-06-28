import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ParamsActions } from 'src/app/store/params/params.actions';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit {
  search: FormControl = new FormControl('');
  @Select((state: any) => state.params.search)
  search$!: Observable<string>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.search$.subscribe((value) => {
      this.search.patchValue(value);
    });
  }
  buscar() {
    this.store.dispatch(new ParamsActions.UpdateParams(this.search.value));
  }
}
