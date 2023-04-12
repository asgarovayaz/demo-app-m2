export type FormModel<T> = { [P in keyof T]: [T[P], any?] | unknown };
