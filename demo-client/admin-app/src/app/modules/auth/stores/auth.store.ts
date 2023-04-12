import { Router } from "@angular/router";
import { Observable, BehaviorSubject, map } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import ERole from "../enums/role.enum";
import { UserModel } from "../models/user.model";
import { AuthModel } from "../models/auth.model";

const AUTH_DATA = "usr";

@Injectable({
  providedIn: "root",
})
export class AuthStore {
  emptyModel: UserModel = {
    UserId: undefined,
    Email: undefined,
    Name: undefined,
    Surname: undefined,
    Position: undefined,
    Role: ERole.User,
    Claims: [],
  };

  private subject = new BehaviorSubject<UserModel>(this.emptyModel);

  user$: Observable<UserModel> = this.subject.asObservable();
  isLoggedIn$!: Observable<boolean>;
  isLoggedOut$!: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.user$.pipe(map((user) => !!user.UserId));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !!loggedIn));

    const user = sessionStorage.getItem(AUTH_DATA);

    if (user) {
      this.subject.next(JSON.parse(user));
    }
  }

  signin(Credentials: AuthModel): Observable<UserModel> {
    this.authService.signIn(Credentials).subscribe((u) => {
      if (u.statusCode === 200) {
        this.subject.next(u.data as UserModel);
        sessionStorage.setItem(AUTH_DATA, JSON.stringify(u.data));
      }
    });
    return this.user$;
  }

  check(): void {
    this.authService.check().subscribe((u) => {
      if (u.statusCode === 200) {
        this.subject.next(u.data as UserModel);
        sessionStorage.setItem(AUTH_DATA, JSON.stringify(u.data));
      }
    });
  }

  logout(): void {
    this.authService.signOut().subscribe(() => {
      this.subject.next(this.emptyModel);
      sessionStorage.removeItem(AUTH_DATA);
      this.router.navigateByUrl("/auth/sign-in");
    });
  }
}
