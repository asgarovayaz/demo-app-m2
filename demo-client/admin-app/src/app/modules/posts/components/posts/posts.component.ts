import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthStore } from "@demo-admin/auth/stores/auth.store";
import { NgbDropdownConfig } from "@ng-bootstrap/ng-bootstrap";
import { Observable, Subscription } from "rxjs";
import { Paginate } from "@demo-admin/shared/interfaces/paginate";
import { PostsService } from "../../posts.service";
import { IAccessModeAlt } from "@demo-admin/shared/models/access-mode-alt.model";
import { AccessModeEnum } from "@demo-admin/shared/enums/access-mode-enum";
import { IPosts } from "../../models/posts.interface";
import { EStatus } from "@demo-admin/shared/enums/status.enum";
import { HotToastService } from "@ngneat/hot-toast";
import { UserModel } from "@demo-admin/auth/models/user.model";
import { ICategories } from "../../../others/categories/models/categories.interface";

@Component({
  selector: "mys-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"],
})
export class PostsComponent implements OnInit {
  user!: UserModel;
  isMobileMenuActive = false;
  isCardToolsCollapsed = false;

  //#region Modes
  accessModeDetails!: IAccessModeAlt;
  accessModes = AccessModeEnum;
  //#endregion

  items$!: Observable<Paginate<IPosts[]>>;

  //#region ShortCategories
  categories!: ICategories[];
  categoriesConverted!: ICategories[];
  //#endregion

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
    private postsService: PostsService
  ) {
    dropdownConfig.placement = "left-top";
    dropdownConfig.autoClose = true;
    this.constructData();
  }

  constructData(): void {
    this.accessModeDetails =
      this.activatedRoute.parent?.snapshot.data["accessMode"];

    this.categories =
      this.activatedRoute.parent?.snapshot.data["shortCategories"];
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
    management: IPosts | undefined = undefined
  ) {
    const accessModeDetails = this.accessModeDetails;
    accessModeDetails.AccessMode = accessMode;

    if (management) accessModeDetails.ModuleId = management.Id;

    if (accessMode === AccessModeEnum.NotSelected) {
      this.toastService.info("Sizin icazəniz yoxdur!", { duration: 3000 });
      return;
    }

    const navigate: string[] = [];
    navigate.push(accessModeDetails.Module, accessModeDetails.AccessMode);

    if (management) navigate.push(management.Id.toString());

    this.router.navigate(navigate);
  }

  loadList() {
    this.items$ = this.postsService.getPagedAll(this.page, this.limit);

    this.items$.subscribe((res) => {
      this.collectionSize = res.collectionSize;
      this.page = res.page;
    });
  }

  onItemStatusChanged(posts: IPosts): void {
    this.postsService.update(posts).subscribe((result) => {
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
