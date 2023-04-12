import { Component, Input, OnInit } from '@angular/core';
import Month from '@demo-admin/shared/utils/month';
import * as moment from 'moment';

@Component({
  selector: 'table-date-deadline-view',
  templateUrl: './table-date-deadline-view.component.html',
})
export class TableDateDeadlineViewComponent implements OnInit {
  @Input() startDate!: string | Date;
  @Input() endDate!: string | Date;

  endDateStr!: string;
  startDateStr!: string;
  isEnded = false;

  constructor() {}

  ngOnInit(): void {
    const forStartDate = moment(this.startDate);
    const forEndDate = moment(this.endDate);
    this.startDateStr = `${forStartDate.format('DD')}-${forStartDate.format('MM')}-${forStartDate.format('YYYY')}`
    this.endDateStr = `${forEndDate.format('DD')}-${forEndDate.format('MM')}-${forEndDate.format('YYYY')}`

    this.isEnded = Number(moment().diff(this.endDate,'day')) >= 0;
  }
}
