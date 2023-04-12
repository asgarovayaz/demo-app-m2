import { Component, Input, OnInit } from '@angular/core';
import { EStatus } from '@demo-admin/shared/enums/status.enum';

@Component({
  selector: 'table-col-status',
  templateUrl: './table-col-status.component.html',
})
export class TableStatusComponent implements OnInit {
  @Input() status!: EStatus | string;
  commonText!: string;
  defaultClass = 'warning';
  ngOnInit(): void {
    switch (this.status) {
      case EStatus.Active:
        this.defaultClass = 'success';
        this.commonText = 'Active';
        break;
      case EStatus.Draft:
        this.defaultClass = 'warning';
        this.commonText = 'Draft';
        break;
      case EStatus.Inactive:
        this.defaultClass = 'danger';
        this.commonText = 'Inactive';
        break;
    }
  }
}
