import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngxs/store';
import { langs } from 'available-langs';
import { Observable } from 'rxjs';
import { GlobalActions } from 'src/app/store/global/global.actions';

@Component({
  selector: 'app-lang-changer',
  templateUrl: './lang-changer.component.html',
  styleUrls: ['./lang-changer.component.scss'],
})
export class LangChangerComponent implements OnInit {
  langs = langs;
  extended = false;
  currentLang$: Observable<string> = this.store.select(
    (state) => state.global.lang
  );
  constructor(private store: Store) {}

  ngOnInit(): void {}
  changeLang(lang: string) {
    this.store.dispatch(new GlobalActions.UpdateLang(lang));
    this.extended = false;
  }
  activateLangs() {}
  extend() {
    this.extended = true;
  }
}
