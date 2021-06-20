import { Component, Inject, Input, Optional} from '@angular/core';
import { Datos } from 'src/app/utility/interfaces/overlayLoaderConfig';
import { PREVIEW_DIALOG_DATA } from 'src/app/utility/interfaces/previewLoaderData';


@Component({
  selector: 'app-loader-titulo',
  templateUrl: './loader-titulo.component.html',
  styleUrls: ['./loader-titulo.component.scss']
})
export class LoaderTituloComponent {
  @Input() title!: string;
  constructor(
    @Optional()
    @Inject(PREVIEW_DIALOG_DATA) public data: Datos,
  ) { }
}
