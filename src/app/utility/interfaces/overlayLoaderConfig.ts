export interface PreviewDialogConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  data?: any;
}
export interface Datos {
  title?: string;
  errores?: Error[];
}
export interface Error {
  title: string;
  value: number;
}
export interface DatosError {
  errores: Error [],
  title: string;
}
