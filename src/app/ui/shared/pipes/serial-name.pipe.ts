import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "describeNameSerial"
})
export class SerialNamePipe implements PipeTransform {
  transform(value: boolean, serials: any): any {
    let object = serials.find((obj: any) => obj.value === value);

    return object.name;
  }
}
