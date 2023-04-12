export type Constructor<T, Arguments extends unknown[] = undefined[]> = new (
  ...arguments_: Arguments
) => T;

export type Plain<T> = T;
export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;

export function isNotNullOrEmpty(item: any): boolean {
  return item !== undefined && item !== null;
}
