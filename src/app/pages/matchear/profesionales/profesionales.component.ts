import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MergeosActions } from 'src/app/store/mergeos/mergeos.actions';

@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.scss'],
})
export class ProfesionalesComponent implements OnInit {
  @Select((state: any) => state.mergeos.searchString)
  search$!: Observable<string>;
  @Select((state: any) => state.mergeos.noResults)
  noResults$!: Observable<string>;
  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const page = params.get('page') || '1';
      const pageSize = params.get('pageSize') || '25';
      const search = params.get('search') || '';
      this.store.dispatch([
        new MergeosActions.UpdateSearch(search),
        new MergeosActions.LoadProfesionales(page, pageSize),
      ]);
    });
    this.noResults$.subscribe((result) => {
      if (result) {
        const params = this.route.snapshot.queryParams;
        const page = params.page || '1';
        const pageSize = params.pageSize || '25';
        this.store.dispatch(
          new MergeosActions.LoadProfesionales(page, pageSize)
        );
      }
    });
    this.search$.subscribe((value) => {
      this.updateParams({search: value, page:1})
    });
  }
  deleteProf(id: number) {
    this.store.dispatch(new MergeosActions.DeleteProfesional(id));
  }
  aceptarMerge() {
    this.store.dispatch(new MergeosActions.MergeProfesionales());
  }
  paginar(data: { page: number; pageSize: number }) {
    this.updateParams({ page: data.page, pageSize: data.pageSize });
  }
  updateParams(params: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }
}
