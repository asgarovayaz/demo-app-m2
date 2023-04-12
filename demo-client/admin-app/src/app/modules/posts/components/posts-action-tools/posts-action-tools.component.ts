import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  NgbModalRef,
  NgbModal,
  NgbDropdownConfig,
  NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { IPosts } from '../../models/posts.interface';
import { AccessModeEnum } from '@demo-admin/shared/enums/access-mode-enum';
import { Subscription } from 'rxjs';
import { EStatus } from '@demo-admin/shared/enums/status.enum';
import { StatusChangeModalComponent } from '@demo-admin/shared/components/status-change-modal/status-change-modal.component';
import { UserModel } from '@demo-admin/auth/models/user.model';

@Component({
  selector: 'mys-posts-action-tools',
  templateUrl: './posts-action-tools.component.html',
  styleUrls: ['./posts-action-tools.component.scss'],
})
export class PostsActionToolsComponent implements OnInit, OnDestroy {
  modalRef!: NgbModalRef;

  accessModes = AccessModeEnum;
  statuses = EStatus;

  @Input() posts!: IPosts;
  @Input() authUser!: UserModel;

  @Output() onItemStatusChanged: EventEmitter<IPosts> =
    new EventEmitter<IPosts>();

  //#region Subscriptions
  subscriptions$ = new Subscription();
  //#endregion

  constructor(
    private modalService: NgbModal,
    dropdownConfig: NgbDropdownConfig,
    private toastService: HotToastService
  ) {
    dropdownConfig.autoClose = true;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.subscriptions$) this.subscriptions$.unsubscribe();
  }

  changeStatus(posts: IPosts, status: EStatus = EStatus.Inactive): void {
    const modalOptions: NgbModalOptions = {
      windowClass: 'zoom',
      size: 'sm',
      ariaLabelledBy: 'status-change-modal',
      centered: true,
    };

    this.modalRef = this.modalService.open(
      StatusChangeModalComponent,
      modalOptions
    );

    this.modalRef.componentInstance['statusMode'] = status;

    this.subscriptions$.add(
      (
        this.modalRef.componentInstance as StatusChangeModalComponent
      ).statusDetail.subscribe((result) => {
        posts.Status = result;
        this.onItemStatusChanged.emit(posts);
      })
    );
  }
}
