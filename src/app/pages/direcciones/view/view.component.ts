import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DireccionesActions } from 'src/app/store/direcciones/direcciones.actions';
import { ParamsActions } from 'src/app/store/params/params.actions';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  @Select((state: any) => state.params.search)
  search$!: Observable<string>;
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const page = params.get('page') || '1';
      const pageSize = params.get('pageSize') || '25';
      const search = params.get('search') || '';
      this.store.dispatch([
        new ParamsActions.UpdateParams(search, page, pageSize),
        new DireccionesActions.LoadDirecciones(),
      ]);
    });
    this.search$.subscribe((value) => {
      this.updateParams({ search: value, page: 1 });
    });
  }

  updateParams(params: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
