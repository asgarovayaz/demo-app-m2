import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EStatus } from '@demo-admin/shared/enums/status.enum';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'status-change-modal',
  templateUrl: './status-change-modal.component.html',
  styleUrls: ['./status-change-modal.component.scss'],
})
export class StatusChangeModalComponent implements OnInit {
  @Output() statusDetail: EventEmitter<EStatus> = new EventEmitter<EStatus>();

  @Input() statusMode: EStatus = EStatus.Inactive;
  statusModes = EStatus;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  dismissModal() {
    this.activeModal.dismiss();
  }

  draft() {
    this.statusDetail.emit(EStatus.Draft);
    this.dismissModal();
  }

  inactive() {
    this.statusDetail.emit(EStatus.Inactive);
    this.dismissModal();
  }
}
