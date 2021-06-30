import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { merge, Observable } from 'rxjs';
import { MergeosActions } from 'src/app/store/mergeos/mergeos.actions';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.scss'],
})
export class EstudiosComponent implements OnInit {
  @Select((state: any) => state.mergeos.noResults)
  noResults$!: Observable<string>;
  @Select((state: any) => state.params)
  search$!: Observable<string>;
  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    merge(this.noResults$, this.search$).subscribe((data) => {
      if (data) {
        this.store.dispatch(new MergeosActions.LoadEstudios());
      }
    });
  }
  deleteRegistro(id: number) {
    this.store.dispatch(new MergeosActions.DeleteEstudios(id));
  }
  aceptarMerge() {
    this.store.dispatch(new MergeosActions.MergeEstudios());
  }
  paginar(data: { page: number; pageSize: number }) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: data.page, pageSize: data.pageSize },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
