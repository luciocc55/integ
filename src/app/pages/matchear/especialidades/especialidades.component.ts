import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { merge, Observable } from 'rxjs';
import { MergeosActions } from 'src/app/store/mergeos/mergeos.actions';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.scss'],
})
export class EspecialidadesComponent implements OnInit {
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
        this.store.dispatch(new MergeosActions.LoadEspecialidades());
      }
    });
  }
  deleteProf(id: number) {
    this.store.dispatch(new MergeosActions.DeleteEspecialidades(id));
  }
  aceptarMerge() {
    this.store.dispatch(new MergeosActions.MergeEspecialidades());
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
