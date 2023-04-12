import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccessModeEnum } from '@demo-admin/shared/enums/access-mode-enum';
import { ELanguage } from '@demo-admin/shared/enums/language.enum';
import { IAccessModeAlt } from '@demo-admin/shared/models/access-mode-alt.model';
import { EDITOR_CONFIG } from 'admin-app/src/app/configs/editor-config';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICreatePosts } from '../../models/create-posts.interface';
import { FormModel } from '@demo-admin/shared/models/form.model';
import { ICreatePostsContents } from '../../models/create-posts-contents.interface';
import { enumToObject } from 'admin-app/src/app/configs/enum-to-object.config';
import { IUpdatePosts } from '../../models/update-posts.interface';
import { IPosts } from '../../models/posts.interface';
import { environment } from 'admin-app/src/environments/environment';
import { IUpdatePostsContents } from '../../models/update-posts-contents.interface';
import { PostsService } from '../../posts.service';
import { EStatus } from '@demo-admin/shared/enums/status.enum';
import { StorageService } from '@demo-admin/shared/services/storage.service';
import { HotToastService } from '@ngneat/hot-toast';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '@demo-admin/auth/models/user.model';
import { ICategories } from '../../../others/categories/models/categories.interface';
@Component({
  selector: 'mys-posts-manage',
  templateUrl: './posts-manage.component.html',
  styleUrls: ['./posts-manage.component.scss'],
})
export class PostsManageComponent implements OnInit, OnDestroy {
  storagePath = `${environment.api}storage/`;

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


  //#region Images
  coverPhotoId!: number;
  sliderPhotosIds: number[] = [];
  //#endregion

  //#region Posts
  posts!: IPosts;
  //#endregion

  //#region ShortCategories
  categories!: ICategories[];
  //#endregion

  editorConfig = EDITOR_CONFIG;

  itemForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private postsService: PostsService,
    private storageService: StorageService,
    private toastService: HotToastService,
    private router: Router
  ) {
    this.constructData();
  }

  constructData(): void {
    this.accessModeDetails =
      this.activatedRoute.parent?.snapshot.data['accessMode'];

      this.categories = this.activatedRoute.parent?.snapshot.data['shortCategories'];

      this.posts = this.activatedRoute.snapshot.data['posts'];
  }
  ngOnDestroy(): void {
    if (this.subscriptions$) this.subscriptions$.unsubscribe();
  }

  ngOnInit(): void {
    if (this.accessModeDetails.AccessMode === this.accessModes.NotSelected) {
      this.router.navigate(['/posts']);
    }else{
      this.itemForm = this.InitItemForm(this.accessModeDetails.AccessMode);
    }

    (this.accessModeDetails.AccessMode === this.accessModes.View) && this.itemForm.disable();
  }

  private InitItemForm(accessMode: AccessModeEnum): FormGroup {
    if (accessMode === this.accessModes.New) {
      return this.createPostsFormGroup();
    } else {
      return this.updatePostsFormGroup(this.posts);
    }
  }

  onSubmit(): void {
    if (!this.itemForm.valid) {
      this.toastService.error('Məlumatların düzgünlüyünü yoxlayın!', {
        duration: 4000,
      });
      return;
    }

    if (this.coverPhotoId) {
      this.itemForm.get('CoverPhotoId')?.setValue(this.coverPhotoId);
    }

    if (this.sliderPhotosIds.length > 0) {
      this.itemForm.get('SliderPhotosIds')?.setValue(this.sliderPhotosIds);
    }


    if(this.accessModeDetails.AccessMode === this.accessModes.Edit) {
      const update: IUpdatePosts = this.itemForm.value;

      this.postsService.update(update).subscribe((result) => {
        if (result.statusCode === 200) this.router.navigate(['/posts']);
      });
    }

    if(this.accessModeDetails.AccessMode === this.accessModes.New) {
      const create: ICreatePosts = this.itemForm.value;

      this.postsService.create(create).subscribe((result) => {
        if (result.statusCode === 201) this.router.navigate(['/posts']);
      });
    }

  }

  onMobileMenu() {
    this.isMobileMenuActive = !this.isMobileMenuActive;
  }

  moveSlide(previousIndex: number, currentIndex: number) {
    moveItemInArray(this.sliderPhotosIds, previousIndex, currentIndex);
  }

  removeSlideItem(item: number) {
    this.sliderPhotosIds = this.sliderPhotosIds.filter((x) => x !== item);
  }

  private createPostsFormGroup(): FormGroup {
    const itemForm: FormModel<ICreatePosts> = {
      CategoryId: [, []],
      Status: [, []],
      Contents: this.formBuilder.array(
        this.languagesObject.map((l) =>
          this.createPostsContentsFormGroup(l.Name)
        )
      ),
    };
    return this.formBuilder.group(itemForm);
  }

  private createPostsContentsFormGroup(language: string): FormGroup {
    const contentForm: FormModel<ICreatePostsContents> = {
      Title: [, [Validators.required]],
      Description: [, []],
      Language: [language as ELanguage, []],
    };
    return this.formBuilder.group(contentForm);
  }

  private updatePostsFormGroup(update: IPosts): FormGroup {
    const itemForm: FormModel<IUpdatePosts> = {
      Id: update.Id,
      Status: update.Status,
      CategoryId: [update.CategoryId, [Validators.required]],
      Contents: this.formBuilder.array(
        this.languagesObject.map((l) =>
          this.updatePostsContentsFormGroup(l.Name, update.Contents)
        )
      ),
    };
    return this.formBuilder.group(itemForm);
  }

  private updatePostsContentsFormGroup(
    language: string,
    contents: IUpdatePostsContents[]
  ): FormGroup {
    const getByLanguage = contents.filter((x) => x.Language === language);
    const contentForm: FormModel<IUpdatePostsContents> = {
      Id: getByLanguage[0].Id,
      Title: [getByLanguage[0].Title, [Validators.required]],
      Description: [getByLanguage[0].Description, []],
      Language: [getByLanguage[0].Language, []],
    };
    return this.formBuilder.group(contentForm);
  }

  onFileSelected(_event: any): void {
    if (_event.target.files.length > 0) {
      const file = _event.target.files[0];

      const updateForm = new FormData();
      updateForm.append('File', file);

      this.storageService.uploadFile(updateForm).subscribe((res) => {
        if (res.statusCode === 201) {
          this.sliderPhotosIds.push(res.data);
        }
      });
    }
  }
}
