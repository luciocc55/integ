import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MatcheosActions } from 'src/app/store/matcheos/matcheos.actions';
import { Matcheados } from 'src/app/store/matcheos/matcheos.state';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  @Select((state: any) => state.matcheos.master)
  master$!: Observable<Matcheados>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const master = params.get('master');
      if (master) {
        this.store.dispatch(
          new MatcheosActions.LoadMasterProfesional(parseInt(master))
        );
      } else {
        this.router.navigate(['../'], {
          relativeTo: this.route,
        });
      }
    });
  }
}
