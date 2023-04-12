import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthStore } from "@demo-admin/auth/stores/auth.store";
import { AccessModeEnum } from "@demo-admin/shared/enums/access-mode-enum";
import { EStatus } from "@demo-admin/shared/enums/status.enum";
import { Paginate } from "@demo-admin/shared/interfaces/paginate";
import { IAccessModeAlt } from "@demo-admin/shared/models/access-mode-alt.model";
import { NgbDropdownConfig } from "@ng-bootstrap/ng-bootstrap";
import { HotToastService } from "@ngneat/hot-toast";
import { Observable, Subscription } from "rxjs";
import { CategoriesService } from "../../categories.service";
import { ICategories } from "../../models/categories.interface";
import { UserModel } from "@demo-admin/auth/models/user.model";

@Component({
  selector: "mys-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent {
  user!: UserModel;
  isMobileMenuActive = false;
  isCardToolsCollapsed = false;

  //#region Modes
  accessModeDetails!: IAccessModeAlt;
  accessModes = AccessModeEnum;
  //#endregion

  items$!: Observable<Paginate<ICategories[]>>;

  //#region Limit
  collectionSize: number = 0;
  page = 1;
  limit = 10;
  //#endregion

  //#region Status
  statuses = EStatus;
  //#endregion

  subscriptions$ = new Subscription();

  constructor(
    private router: Router,
    private toastService: HotToastService,
    private authStore: AuthStore,
    dropdownConfig: NgbDropdownConfig,
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {
    dropdownConfig.placement = "left-top";
    dropdownConfig.autoClose = true;
    this.constructData();
  }

  constructData(): void {
    this.accessModeDetails =
      this.activatedRoute.parent?.snapshot.data["accessMode"];
  }

  ngOnInit(): void {
    this.subscriptions$.add(
      this.authStore.user$.subscribe((user) => {
        this.user = user;
      })
    );

    this.loadList();
  }

  createNew(
    accessMode: AccessModeEnum = AccessModeEnum.NotSelected,
    management: ICategories | undefined = undefined
  ) {
    const accessModeDetails = this.accessModeDetails;
    accessModeDetails.SubModuleAccessMode = accessMode;

    if (management) accessModeDetails.SubModuleId = management.Id;

    if (accessMode === AccessModeEnum.NotSelected) {
      this.toastService.info("Sizin icazəniz yoxdur!", { duration: 3000 });
      return;
    }

    const navigate: string[] = [];
    navigate.push(
      accessModeDetails.Module,
      accessModeDetails.SubModule,
      accessModeDetails.SubModuleAccessMode
    );

    if (management) navigate.push(management.Id.toString());

    this.router.navigate(navigate);
  }

  loadList() {
    this.items$ = this.categoriesService.getPagedAll(this.page, this.limit);

    this.items$.subscribe((res) => {
      this.collectionSize = res.collectionSize;
      this.page = res.page;
    });
  }

  onItemStatusChanged(categories: ICategories): void {
    this.categoriesService.update(categories).subscribe((result) => {
      if (result.statusCode === 200) {
        this.toastService.success("Changed successfully");
        this.loadList();
      }
    });
  }

  onMobileMenu() {
    this.isMobileMenuActive = !this.isMobileMenuActive;
  }

  onShowLimit(item: number) {
    this.limit = item;
    this.loadList();
  }

  onPageChange(page: number) {
    this.page = page;
    this.loadList();
  }
}
