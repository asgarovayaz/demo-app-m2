import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'ss-evt-approve-detail',
  templateUrl: './approve-detail.component.html',
  styleUrls: ['./approve-detail.component.scss'],
})
export class DialogComponent implements OnInit {
  @Output() approvedDetail: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  constructor(
    private activeModal: NgbActiveModal,
  ) {}

  ngOnInit(): void {}

  dismissModal() {
    this.activeModal.dismiss();
  }

  approveDetail() {
    this.approvedDetail.emit(true);
  }
}
