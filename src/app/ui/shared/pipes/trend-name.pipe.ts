import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "describeNameTrend"
})
export class TrendNamePipe implements PipeTransform {
  transform(id: number, trends: any): any {
    let object = trends.find((obj: any) => obj.id === id);

    return object.name;
  }
}
