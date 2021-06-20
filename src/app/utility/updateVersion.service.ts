import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
@Injectable()
export class UpdateService {
  constructor(private updates: SwUpdate) {
    this.checkForUpdates();
    const everySixHours$ = interval(0.2 * 60 * 60 * 1000);
    everySixHours$.subscribe(() => this.updates.checkForUpdate());
  }

  public checkForUpdates(): void {
    if (this.updates.isEnabled) {
      this.updates.checkForUpdate();
      this.updates.available.subscribe(() => {
        localStorage.removeItem('carrito');
        localStorage.removeItem('cuentas');
        window.location.reload();
      });
    }
  }
}
