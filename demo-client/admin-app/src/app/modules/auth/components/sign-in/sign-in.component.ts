import { map, Subscription } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthModel } from './../../models/auth.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ERole from '@demo-admin/auth/enums/role.enum';
import { AuthStore } from '@demo-admin/auth/stores/auth.store';
import { FormModel } from '@demo-admin/shared/models/form.model';

@Component({
  selector: 'mys-reg-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
  userAuthForm!: FormGroup;
  isSHowPass = false;
  inputType = 'password';
  subs = new Subscription();
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authStore: AuthStore,
    private toastService: HotToastService
  ) {}
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.add(
      this.authStore.user$.subscribe((isIn) => {
        if (isIn.UserId) {
          this.router.navigate(['']);
        }
      })
    );

    this.userAuthForm = this.InitUserAuthForm();
  }

  private InitUserAuthForm(): FormGroup {
    const authForm: FormModel<AuthModel> = {
      Email: ['', [Validators.required, Validators.email]],
      Passcode: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(24),
        ],
      ],
    };
    return this.formBuilder.group(authForm);
  }

  onSubmit() {
    if (this.userAuthForm.valid) {
      const user = this.authStore.signin(this.userAuthForm.value);
      user.pipe(
        map((u) => {
          if (u.UserId) {
            this.router.navigate(['']);
          } else {
            this.toastService.error('İstifadəçi mövcud deyil');
          }
        })
      );
    }
  }

  showPasscode() {
    this.isSHowPass = !this.isSHowPass;
    this.inputType = this.isSHowPass ? 'text' : 'password';
  }
}
