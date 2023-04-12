import { FormModel } from './../models/form.model';
export interface IAbstractComponent {
  onSubmit(): void;

  initForm(): FormModel<unknown>
}
