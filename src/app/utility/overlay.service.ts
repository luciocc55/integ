import { Injectable, Injector, ComponentRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { PreviewDialogConfig } from './interfaces/overlayLoaderConfig';
import { PREVIEW_DIALOG_DATA } from './interfaces/previewLoaderData';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  constructor(private injector: Injector, private overlay: Overlay) {}

  createOverlay(config: PreviewDialogConfig, position: any) {
    const overlayConfig = this.getOverlayConfig(config, position);
    return this.overlay.create(overlayConfig);
  }
  attachContainer(
    overlayRef: OverlayRef,
    config: PreviewDialogConfig,
    dialogRef: OverlayRef,
    component: any
  ) {
    const injector = this.createInjector(config, dialogRef);
    const containerPortal = new ComponentPortal(component, null, injector);
    const containerRef: ComponentRef<typeof component> = overlayRef.attach(
      containerPortal
    );
    return containerRef;
  }
  createInjector(
    config: PreviewDialogConfig,
    dialogRef: OverlayRef
  ): PortalInjector {
    const injectionTokens = new WeakMap();
    injectionTokens.set(OverlayRef, dialogRef);
    injectionTokens.set(PREVIEW_DIALOG_DATA, config.data);
    return new PortalInjector(this.injector, injectionTokens);
  }
  getOverlayConfig(
    config: PreviewDialogConfig,
    positionStrategy: any
  ): OverlayConfig {
    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy,
    });
    return overlayConfig;
  }
}
