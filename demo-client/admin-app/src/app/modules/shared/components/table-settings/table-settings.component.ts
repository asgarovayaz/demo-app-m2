import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import EOrderBy from '@demo-admin/shared/enums/order-by.enum';
import { NgbDropdown, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'demo-admin-table-settings',
  templateUrl: './table-settings.component.html',
  styleUrls: ['./table-settings.component.scss'],
  providers: [NgbDropdownConfig],
})
export class TableSettingsComponent implements OnInit {
  //#region Limit
  showLimits = [5, 10, 20, 30, 40, 50];
  selectedShowLimit = 10;
  @Output() defaultShowLimit: EventEmitter<number> = new EventEmitter<number>();
  //#endregion

  @ViewChild('filterDropdown') filterDropdown!: NgbDropdown;

  constructor(dropdownConfig: NgbDropdownConfig) {
    dropdownConfig.autoClose = false;
  }

  ngOnInit(): void {}

  onShowLimit(item: number) {
    this.selectedShowLimit = item;
    this.defaultShowLimit.emit(item);

    this.filterDropdown.close()
  }

  transform(value: any): any {
    let keys = [];
    for (let key in value) {
      keys.push({ key: key, value: value[key] });
    }
    return keys;
  }
}
