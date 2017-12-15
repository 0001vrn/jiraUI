import { Component, EventEmitter, Output, Input } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent {
 
  selectedDate: string;
  @Input() myMin;
  @Input() myMax;
  
  @Output() dateChange: EventEmitter<string> = new EventEmitter<string>();
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
  dateEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    //console.log(`${type} ${event.value.toDateString()}`);
    this.selectedDate = (event.value.getMonth()+1)+'-'+event.value.getDay()+'-'+event.value.getFullYear();
    //console.log(this.selectedDate);
    this.dateChange.emit(this.selectedDate);
  }
  


}
