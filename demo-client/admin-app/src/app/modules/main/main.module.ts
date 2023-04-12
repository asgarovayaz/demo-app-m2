import { NgModule } from '@angular/core';
import { MainComponent } from './components/main/main.component';
import { BrowserModule } from '@angular/platform-browser';
import { MainRoutingModule } from './main-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { NgSelectModule } from '@ng-select/ng-select';
import { InputMaskModule } from '@ngneat/input-mask';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptorProvider } from '../../providers/token-intercept.provider';
import { LoaderInterceptorProvider } from '../../providers/loader-intercept.provider';
import { toastConfig } from '../../configs/toast.config';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TinyMCEProvider } from '../../providers/tinymce.provider';
import { provideErrorTailorConfig } from '@ngneat/error-tailor';
import { SharedModule } from '@demo-admin/shared/shared.module';

@NgModule({
  declarations: [MainComponent, LayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgSelectModule,
    SharedModule,
    MainRoutingModule,
    HotToastModule.forRoot(toastConfig),
    InputMaskModule,
    EditorModule,
  ],
  providers: [
    TokenInterceptorProvider,
    LoaderInterceptorProvider,
    TinyMCEProvider,
    provideErrorTailorConfig({
      errors: {
        useValue: {
          required: 'Bu xananın doldurulması zəruridir.',
          controlErrorsClass: 'error',
          minlength: ({ requiredLength, actualLength }) =>
            `Gözlənilən ${requiredLength} simvoldur, lakin ${actualLength} əlavə olunub`,
          invalidAddress: (error) => `Ünvan düzgün deyil`,
        },
      },
    })
  ],
  bootstrap: [MainComponent],
})
export class MainModule {}
