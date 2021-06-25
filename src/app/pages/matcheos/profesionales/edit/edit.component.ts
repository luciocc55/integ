import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { BusquedasActions } from 'src/app/store/busquedas/busquedas.actions';
import { MatcheosActions } from 'src/app/store/matcheos/matcheos.actions';
import { Matcheados } from 'src/app/store/matcheos/matcheos.state';
import { ToastPreguntaService } from 'src/app/utility/toastPregunta.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  @Select((state: any) => state.matcheos.master)
  master$!: Observable<Matcheados>;
  @Select((state: any) => state.matcheos.searchString)
  search$!: Observable<string>;
  searchMarker!: boolean;
  idMaster!: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private preguntaService: ToastPreguntaService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const master = params.get('master');
      if (master) {
        this.idMaster = parseInt(master);
        const page = params.get('page') || '1';
        const pageSize = params.get('pageSize') || '25';
        const search = params.get('search') || '';
        this.searchMarker = search ? true : false;
        this.store.dispatch([
          new MatcheosActions.UpdateSearch(search),
          new BusquedasActions.UpdateSearch(search),
          new BusquedasActions.BuscarProfesionales(page, pageSize),
          new MatcheosActions.LoadMasterProfesional(this.idMaster),
        ]);
      } else {
        this.router.navigate(['../'], {
          relativeTo: this.route,
        });
      }
    });
    this.search$.subscribe((value) => {
      this.store.dispatch(new BusquedasActions.UpdateSearch(value));
      this.updateParams({ search: value, page: 1 });
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
      replaceUrl: true,
    });
  }
  deleteMaster(idMaster: number) {
    const ref = this.preguntaService.openStandard();
    const subscription: Subscription = ref.instance.decision.subscribe(
      (value) => {
        if (value) {
          this.store
            .dispatch(new MatcheosActions.DeleteMasterProfesional(idMaster))
            .subscribe(() => {
              this.restore();
            });
        }
        subscription.remove(subscription);
      }
    );
  }
  unMatch(idMatch: number) {
    this.store
      .dispatch(new MatcheosActions.UnMatchProfesional(idMatch))
      .subscribe(() => {
        this.restore();
      });
  }
  addMatch(idMatch: number) {
    this.store
      .dispatch(new MatcheosActions.MatchProfesional(idMatch, this.idMaster))
      .subscribe(() => {
        this.restore();
      });
  }
  restore() {
    this.store.dispatch(
      new MatcheosActions.LoadMasterProfesional(this.idMaster)
    );
  }
}
