import { Component, HostListener, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GlobalActions } from 'src/app/store/global/global.actions';

@Component({
  selector: 'app-scroll-up',
  templateUrl: './scroll-up.component.html',
  styleUrls: ['./scroll-up.component.scss'],
})
export class ScrollUpComponent implements OnInit {
  @Select((state:any) => state.global.scroll) scroll$!: Observable<number>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.scroll$.subscribe((scroll) => {
      if (scroll === 0) {
        window.scroll({ top: scroll, behavior: 'smooth' });
      }
    });
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateScroll(document.documentElement.scrollTop);
  }
  updateScroll(scr: number) {
    this.store.dispatch(new GlobalActions.UpdateScroll(scr));
  }
  scrollTop() {
    this.store.dispatch(new GlobalActions.UpdateScroll(0));
  }
}
