import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MergeoTableComponent } from './mergeo-table/mergeo-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { SelectedDisplayComponent } from './selected-display/selected-display.component';
import { MergeoButtonComponent } from './mergeo-button/mergeo-button.component';

@NgModule({
  declarations: [
    MergeoTableComponent,
    SelectedDisplayComponent,
    MergeoButtonComponent,
  ],
  imports: [CommonModule, SharedModule, TranslocoModule],
  exports: [
    MergeoTableComponent,
    SelectedDisplayComponent,
    MergeoButtonComponent,
  ],
})
export class MergeosModule {}
