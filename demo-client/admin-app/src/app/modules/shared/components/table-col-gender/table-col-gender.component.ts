import { Component, Input, OnInit } from '@angular/core';
import { EGender } from '@demo-admin/shared/enums/gender.enum';
import { EStatus } from '@demo-admin/shared/enums/status.enum';

@Component({
  selector: 'table-col-gender',
  templateUrl: './table-col-gender.component.html',
})
export class TableGenderComponent implements OnInit {
  @Input() gender!: EGender;
  defaultClass = '';
  defaultText = '';
  ngOnInit(): void {
    switch (this.gender) {
      case EGender.Qadın:
        this.defaultClass = 'bi bi-gender-female';
        this.defaultText = 'Qadın';
        break;
      case EGender.Kişi:
        this.defaultClass = 'bi bi-gender-male';
        this.defaultText = 'Kişi';
        break;
    }
  }
}
