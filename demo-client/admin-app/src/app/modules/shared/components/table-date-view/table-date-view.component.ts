import { Component, Input, OnInit } from '@angular/core';
import reverseToNormalDateString from '@demo-admin/shared/utils/reverse-to-normal-date';
import * as moment from 'moment';

@Component({
  selector: 'table-date-view',
  templateUrl: './table-date-view.component.html',
})
export class TableDateViewComponent implements OnInit {
  @Input() date!: string | undefined;
  @Input() additionalClass!: string;
  @Input() additionalText!: string;
  @Input() withTime: boolean = false;
  @Input() isBirthday: boolean = false;
  day!: string;
  month!: string;
  year!: string;
  hour!: string;
  minute!: string;
  age!: number;

  constructor() {}

  ngOnInit(): void {
    this.date = reverseToNormalDateString(this.date);

    this.year = moment(this.date).format("YYYY");
    this.month = moment(this.date).format("MM");
    this.day = moment(this.date).format("DD");
    this.hour = moment(this.date).format("HH");
    this.minute = moment(this.date).format("mm");
    this.age = moment().diff(this.date, 'years');
  }
}
