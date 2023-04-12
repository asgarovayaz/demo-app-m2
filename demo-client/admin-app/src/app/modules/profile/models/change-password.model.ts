export interface ChangePasswordModel {
  UserId: number | undefined;
  OldPassword: string | undefined;
  NewPassword: string | undefined;
  NewRePassword: string | undefined;
}
