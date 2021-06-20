import { Component, Injectable, NgModule } from '@angular/core';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { TranslocoService } from '@ngneat/transloco';
import { Subject } from 'rxjs';

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  constructor(private translocoService: TranslocoService) {}
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = this.translocoService.translateObject('pagination.primer');
  itemsPerPageLabel = this.translocoService.translateObject('pagination.title');
  lastPageLabel = this.translocoService.translateObject('pagination.ultima');

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = this.translocoService.translateObject('pagination.siguiente');
  previousPageLabel = this.translocoService.translateObject(
    'pagination.anterior'
  );

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return this.translocoService.translateObject('pagination.guia', {
        actual: '1',
        totalPage: '1',
        total: length,
      });
      //return $localize`Page 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return this.translocoService.translateObject('pagination.guia', {
      actual: page + 1,
      totalPage: amountPages,
      total: length,
    });
  }
}
