import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class HelperFunctions {
  constructor(private translocoService: TranslocoService) {}
  getLang(): any {
    let lang = 'en_US';
    const activeLang = this.translocoService.getActiveLang();
    switch (activeLang) {
      case 'es':
        lang = 'es_AR';
        break;
      case 'us':
        lang = 'en_US';
        break;
      case 'br':
        lang = 'pt_BR';
        break;
    }
    return lang;
  }
}
