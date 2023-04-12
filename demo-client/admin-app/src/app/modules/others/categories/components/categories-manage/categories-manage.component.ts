import { Component, OnDestroy, OnInit } from '@angular/core';
import { EColorPalette } from '@demo-admin/shared/enums/color-palette.enum';
import { ICategories } from '../../models/categories.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ELanguage } from '@demo-admin/shared/enums/language.enum';
import { enumToObject } from 'admin-app/src/app/configs/enum-to-object.config';
import { Subscription } from 'rxjs';
import { IAccessModeAlt } from '@demo-admin/shared/models/access-mode-alt.model';
import { AccessModeEnum } from '@demo-admin/shared/enums/access-mode-enum';
import { EStatus } from '@demo-admin/shared/enums/status.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { FormModel } from '@demo-admin/shared/models/form.model';
import { StorageService } from '@demo-admin/shared/services/storage.service';
import { HotToastService } from '@ngneat/hot-toast';
import { CategoriesService } from '../../categories.service';
import { ICreateCategoriesContents } from '../../models/create-categories-contents.interface';
import { ICreateCategories } from '../../models/create-categories.interface';
import { IUpdateCategoriesContents } from '../../models/update-categories-contents.interface';
import { IUpdateCategories } from '../../models/update-categories.interface';
import { UserModel } from '@demo-admin/auth/models/user.model';

@Component({
  selector: 'mys-categories-manage',
  templateUrl: './categories-manage.component.html',
  styleUrls: ['./categories-manage.component.scss'],
})
export class CategoriesManageComponent implements OnInit, OnDestroy {
  //#region Subscriptions
  subscriptions$ = new Subscription();
  //#endregion

  user!: UserModel;
  isMobileMenuActive = false;
  isCardToolsCollapsed = false;

  //#region Modes
  accessModeDetails!: IAccessModeAlt;
  accessModes = AccessModeEnum;
  //#endregion

  active = 'az';

  //#region Languages
  languages = ELanguage;
  languagesObject = enumToObject(ELanguage);
  //#endregion

  //#region Status
  statuses = EStatus;
  //#endregion

  //#region ColorPalette
  colorPalettes = EColorPalette;
  //#endregion

  //#region Categories
  categories!: ICategories;
  //#endregion

  itemForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private storageService: StorageService,
    private toastService: HotToastService,
    private router: Router
  ) {
    this.constructData();
  }

  constructData(): void {
    this.accessModeDetails =
      this.activatedRoute.parent?.snapshot.data['accessMode'];

    this.categories = this.activatedRoute.snapshot.data['categories'];
  }
  ngOnDestroy(): void {
    if (this.subscriptions$) this.subscriptions$.unsubscribe();
  }

  ngOnInit(): void {
    if (
      this.accessModeDetails.SubModuleAccessMode ===
      this.accessModes.NotSelected
    ) {
      this.router.navigate(['/', 'others', 'categories']);
    } else {
      this.itemForm = this.InitItemForm(
        this.accessModeDetails.SubModuleAccessMode
      );
    }

    this.accessModeDetails.SubModuleAccessMode === this.accessModes.View &&
      this.itemForm.disable();
  }

  private InitItemForm(accessMode: AccessModeEnum): FormGroup {
    if (accessMode === this.accessModes.New) {
      return this.createCategoriesFormGroup();
    } else {
      return this.updateCategoriesFormGroup(this.categories);
    }
  }

  onSubmit(): void {
    if (!this.itemForm.valid) {
      this.toastService.error('Check the correctness of the data!', {
        duration: 4000,
      });
      return;
    }

    if (this.accessModeDetails.SubModuleAccessMode === this.accessModes.Edit) {
      const update: IUpdateCategories = this.itemForm.value;

      this.categoriesService.update(update).subscribe((result) => {
        if (result.statusCode === 200)
          this.router.navigate(['/', 'others', 'categories']);
      });
    }

    if (this.accessModeDetails.SubModuleAccessMode === this.accessModes.New) {
      const create: ICreateCategories = this.itemForm.value;

      this.categoriesService.create(create).subscribe((result) => {
        if (result.statusCode === 201)
          this.router.navigate(['/', 'others', 'categories']);
      });
    }
  }

  onMobileMenu() {
    this.isMobileMenuActive = !this.isMobileMenuActive;
  }

  private createCategoriesFormGroup(): FormGroup {
    const itemForm: FormModel<ICreateCategories> = {
      Status: [, []],
      Contents: this.formBuilder.array(
        this.languagesObject.map((l) =>
          this.createCategoriesContentsFormGroup(l.Name)
        )
      ),
    };
    return this.formBuilder.group(itemForm);
  }

  private createCategoriesContentsFormGroup(language: string): FormGroup {
    const contentForm: FormModel<ICreateCategoriesContents> = {
      Title: [, [Validators.required]],
      Language: [language as ELanguage, []],
    };
    return this.formBuilder.group(contentForm);
  }

  private updateCategoriesFormGroup(update: ICategories): FormGroup {
    const itemForm: FormModel<IUpdateCategories> = {
      Id: update.Id,
      Status: update.Status,
      Contents: this.formBuilder.array(
        this.languagesObject.map((l) =>
          this.updateCategoriesContentsFormGroup(l.Name, update.Contents)
        )
      ),
    };
    return this.formBuilder.group(itemForm);
  }

  private updateCategoriesContentsFormGroup(
    language: string,
    contents: IUpdateCategoriesContents[]
  ): FormGroup {
    const getByLanguage = contents.filter((x) => x.Language === language);
    const contentForm: FormModel<IUpdateCategoriesContents> = {
      Id: getByLanguage[0].Id,
      Title: [getByLanguage[0].Title, [Validators.required]],
      Language: [getByLanguage[0].Language, []],
    };
    return this.formBuilder.group(contentForm);
  }
}
