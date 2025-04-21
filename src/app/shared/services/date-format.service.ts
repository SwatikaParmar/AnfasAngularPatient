// date-time.service
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateFormatService {
  public getDateFormatbyyear(): string {
    return 'yyyy-MM-dd'; // add you own logic here
  }
  public getFormat(): string {
    return 'MM/dd/yyyy'; // add you own logic here
  }
  public getLocale(): string {
    return 'he-IL'; // add you own logic here
  }
}
