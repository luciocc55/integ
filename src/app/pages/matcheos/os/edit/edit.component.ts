import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class EditComponent implements OnInit, OnDestroy {
  @Select((state: any) => state.matcheos.master)
  master$!: Observable<Matcheados>;
  @Select((state: any) => state.params.search)
  search$!: Observable<string>;
  searchMarker!: boolean;
  idMaster!: number;
  searchSubscription!: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private preguntaService: ToastPreguntaService
  ) {}
  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.searchSubscription = this.search$.subscribe((data) => {
      if (data) {
        this.searchMarker = true;
        this.store.dispatch(new BusquedasActions.BuscarOs());
      }
    });
    this.route.queryParamMap.subscribe((params) => {
      const master = params.get('master');
      if (master) {
        if (this.idMaster !== parseInt(master)) {
          this.idMaster = parseInt(master);
          this.store.dispatch([
            new MatcheosActions.LoadMasterOs(this.idMaster),
          ]);
        }
      } else {
        this.router.navigate(['../'], {
          relativeTo: this.route,
        });
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
  deleteMaster(idMaster: number) {
    const ref = this.preguntaService.openStandard();
    const subscription: Subscription = ref.instance.decision.subscribe(
      (value) => {
        if (value) {
          this.store
            .dispatch(new MatcheosActions.DeleteMasterOs(idMaster))
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
      .dispatch(new MatcheosActions.UnMatchOs(idMatch))
      .subscribe(() => {
        this.restore();
      });
  }
  addMatch(idMatch: number) {
    this.store
      .dispatch(new MatcheosActions.MatchOs(idMatch, this.idMaster))
      .subscribe(() => {
        this.restore();
      });
  }
  restore() {
    this.store.dispatch(new MatcheosActions.LoadMasterOs(this.idMaster));
  }
}
