import { ApplicationRef, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { BehaviorSubject } from 'rxjs';
import { themes } from './themes';

@Injectable()
export class ThemingService {
  theme = new BehaviorSubject(themes[1]);
  storageWatch = new BehaviorSubject(false);
  base = 'consolidador';
  constructor(private ref: ApplicationRef, private store: Store) {
    const localSetting = localStorage.getItem(this.base)
      ? localStorage.getItem(this.base)
      : undefined;
    const darkModeOn =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (darkModeOn && localSetting === undefined) {
      this.theme.next(themes[0]);
      localStorage.setItem(this.base, themes[0]);
    } else {
      if (localSetting) {
        this.theme.next(localSetting);
      } else {
        this.theme.next(themes[1]);
        localStorage.setItem(this.base, themes[1]);
      }
    }
    window.addEventListener('storage', (e) => {
      const value = e.newValue ? e.newValue : '';
      if (e.key === this.base && themes.includes(value)) {
        this.storageWatch.next(true);
        this.theme.next(value);
        this.ref.tick();
      }
    });
    // watch for changes of the preference
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        const turnOn = e.matches;
        this.theme.next(turnOn ? themes[0] : themes[1]);
        localStorage.setItem(this.base, turnOn ? themes[0] : themes[1]);
        // trigger refresh of UI
        this.ref.tick();
      });
  }
  nextLocal(theme: string) {
    localStorage.setItem(this.base, theme);
  }
}
