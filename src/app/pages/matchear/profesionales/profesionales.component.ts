import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MergeosActions } from 'src/app/store/mergeos/mergeos.actions';

@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.scss'],
})
export class ProfesionalesComponent implements OnInit {
  search: FormControl = new FormControl('');
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
      this.search.setValue(search);
      this.store.dispatch(
        new MergeosActions.LoadProfesionales(search, page, pageSize)
      );
    });
  }
  deleteProf(id: number) {
    this.store.dispatch(new MergeosActions.DeleteProfesional(id));
  }
  paginar(data: { page: number; pageSize: number }) {
    this.updateParams({ page: data.page, pageSize: data.pageSize });
  }
  buscar() {
    this.updateParams({ search: this.search.value });
  }
  aceptarMerge() {
    this.store.dispatch(new MergeosActions.MergeProfesionales());
  }
  updateParams(params: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }
}
