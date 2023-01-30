import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "describeNameStatus"
})
export class StatuslNamePipe implements PipeTransform {
  transform(id: number, serials: any): any {
    let object = serials.find((obj: any) => obj.id === id);

    return object.name;
  }
}
