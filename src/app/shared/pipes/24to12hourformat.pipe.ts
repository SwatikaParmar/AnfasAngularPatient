import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'Format24To12HourTime'})
export class AMPMTimeFormat implements PipeTransform {
     transform(time: any): any {
         let hour = (time.split(':'))[0]; 
         let min = (time.split(':'))[1]; 
        
         let part = hour > 12 ? 'PM' : 'AM';
         min = (min + '').length === 1 ? `0${min}` : min;
         hour = hour > 12 ? hour - 12 : hour;
         hour = (hour + '').length === 1 ? `0${hour}` : hour;
         return `${hour}:${min} ${part}`;
       }
   }
