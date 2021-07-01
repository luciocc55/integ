import { OverlayContainer, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { themes } from './utility/themes';
import { ThemingService } from './utility/theming.service';
import { UpdateService } from './utility/updateVersion.service';
import { TemplatePortal } from '@angular/cdk/portal';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { GlobalActions } from './store/global/global.actions';
import { menuData } from './routesMenu';
import { GlobalState } from './store/global/global.state';
import { OverlayLoadingService } from './utility/overlayLoading.service';
import { TranslocoService } from '@ngneat/transloco';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('scrollTopTemplate') scrollTopTemplate!: TemplateRef<any>;
  themingSubscription!: Subscription;
  @Select((state: any) => state.global.showFloatMenu)
  floatMenu$!: Observable<boolean>;
  @Select((state: any) => state.cuentas.token)
  token$!: Observable<string>;
  @Select((state: any) => state.global.sideExpanded)
  sideExpanded$!: Observable<boolean>;
  @Select((state: any) => state.global.lang)
  lang$!: Observable<string>;
  @Select(GlobalState.isLoading)
  loader$!: Observable<boolean>;
  configs = new OverlayConfig({
    hasBackdrop: false,
    positionStrategy: this.overlay
      .position()
      .global()
      .bottom('1em')
      .right('0.3em'),
  });
  isLogged: any = null;
  overlayRef = this.overlay.create(this.configs);
  statedUrl!: string | null;
  menuData = menuData;
  constructor(
    private overlay: Overlay,
    private themingService: ThemingService,
    private overlayContainer: OverlayContainer,
    private renderer: Renderer2,
    private sw: UpdateService,
    private viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private dtch: ChangeDetectorRef,
    private overlayLoadingService: OverlayLoadingService,
    private translocoService: TranslocoService
  ) {}
  ngAfterViewInit(): void {
    this.floatMenu$.subscribe((float) => {
      if (float) {
        this.attach();
      } else {
        this.overlayRef.detach();
      }
    });
  }
  expansionOpen() {}
  triggerChange() {
    this.store.dispatch(new GlobalActions.ChangeSideMode());
  }
  @HostBinding('class')
  public cssClass!: string;

  ngOnInit() {
    forkJoin([
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd)
      ),
      this.route.url,
    ]).subscribe((value) => {
      this.statedUrl = this.route.snapshot.firstChild?.data?.state;
    });
    this.sw.checkForUpdates();
    this.themingSubscription = this.themingService.theme.subscribe(
      (theme: string) => {
        this.renderer.removeClass(document.body, this.cssClass);
        this.cssClass = theme;
        this.renderer.addClass(document.body, this.cssClass);
        this.applyThemeOnOverlays();
      }
    );
    this.token$.subscribe((token) => {
      if (token) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
      this.dtch.detectChanges();
    });
    this.loader$.subscribe((bool) => {
      if (bool) {
        this.overlayLoadingService.open();
      } else {
        this.overlayLoadingService.close();
      }
    });
    this.lang$.subscribe((lang) => {
      this.translocoService.setActiveLang(lang);
    });
  }
  attach() {
    if (!this.overlayRef.hasAttached()) {
      this.overlayRef.attach(
        new TemplatePortal(this.scrollTopTemplate, this.viewContainerRef)
      );
    }
  }
  /**
   * Apply the current theme on components with overlay (e.g. Dropdowns, Dialogs)
   */
  private applyThemeOnOverlays() {
    const overlayContainerClasses =
      this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(themes);
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(this.cssClass);
  }

  ngOnDestroy() {
    this.themingSubscription.unsubscribe();
  }
}
