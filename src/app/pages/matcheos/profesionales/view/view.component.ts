import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MatcheosActions } from 'src/app/store/matcheos/matcheos.actions';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  @Select((state: any) => state.matcheos.searchString)
  search$!: Observable<string>;
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const page = params.get('page') || '1';
      const pageSize = params.get('pageSize') || '25';
      const search = params.get('search') || '';
      this.store.dispatch([
        new MatcheosActions.UpdateSearch(search),
        new MatcheosActions.LoadProfesionales(page, pageSize),
      ]);
    });
    this.search$.subscribe((value) => {
      this.updateParams({search: value, page:1})
    });
  }
  paginar(data: { page: number; pageSize: number }) {
    this.updateParams({ page: data.page, pageSize: data.pageSize });
  }
  updateParams(params: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }
  deteleteMaster(idMaster:number){
    this.store.dispatch(new MatcheosActions.DeleteMasterProfesional(idMaster))
  }
  unMatch(idMatch:number){
    this.store.dispatch(new MatcheosActions.UnMatchProfesional(idMatch));
  }

}
