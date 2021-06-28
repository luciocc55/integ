import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "search",
  pure: false,
})
export class SearchPipe implements PipeTransform {
  constructor() {}

  transform(value: any[], clave: string, filter: string) {
    if (value && filter) {
      if (value.length) {
        const lowerFilter = filter.toLowerCase();
        return value.filter(
          (element) => element[clave].toLowerCase().indexOf(lowerFilter) > -1
        );
      }
    }
    return value;
  }
}
