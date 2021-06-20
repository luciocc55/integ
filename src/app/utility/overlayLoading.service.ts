import { Injectable, ComponentRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { LoaderTituloComponent } from 'src/app/shared/loader-titulo/loader-titulo.component';
import { Datos, PreviewDialogConfig } from './interfaces/overlayLoaderConfig';
import { OverlayService } from './overlay.service';
const DEFAULT_CONFIG = {
  hasBackdrop: false,
};
@Injectable({
  providedIn: 'root',
})
export class OverlayLoadingService {
  dialogRef!: OverlayRef;
  compRef!: ComponentRef<LoaderTituloComponent>;
  constructor(
    private overlay: Overlay,
    private overlayService: OverlayService
  ) {}
  open(data?: Datos) {
    if (this.dialogRef) {
      this.close();
    }
    [this.dialogRef, this.compRef] = this.openLoader({
      data,
    });
    if (this.dialogRef.overlayElement.parentElement) {
      this.dialogRef.overlayElement.parentElement.className += ' super';
    }
  }
  changeDatos(data: Datos) {
    this.compRef.instance.data = data;
  }
  close() {
    if (this.dialogRef) {
      this.dialogRef.dispose();
    }
  }
  openLoader(config: PreviewDialogConfig = {}) {
    // Override default configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };
    // Returns an OverlayRef which is a PortalHost
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
    const overlayRef = this.overlayService.createOverlay(
      dialogConfig,
      positionStrategy
    );
    // Instantiate remote control
    const dialogRef = overlayRef;
    const overlayComponent: any = this.overlayService.attachContainer(
      overlayRef,
      dialogConfig,
      dialogRef,
      LoaderTituloComponent,
    );
    return [dialogRef, overlayComponent];
  }
}
