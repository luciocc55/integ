import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { merge, Observable } from 'rxjs';
import { MatcheosActions } from 'src/app/store/matcheos/matcheos.actions';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  @Select((state: any) => state.matcheos.noResults)
  noResults$!: Observable<string>;
  @Select((state: any) => state.params)
  search$!: Observable<string>;
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    merge(this.noResults$, this.search$).subscribe((data) => {
      if (data) {
        this.store.dispatch(new MatcheosActions.LoadProfesionales());
      }
    });
  }
  paginar(data: { page: number; pageSize: number }) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: data.page, pageSize: data.pageSize },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  deteleteMaster(idMaster: number) {
    this.store.dispatch(new MatcheosActions.DeleteMasterProfesional(idMaster));
  }
  unMatch(idMatch: number) {
    this.store.dispatch(new MatcheosActions.UnMatchProfesional(idMatch));
  }
}
