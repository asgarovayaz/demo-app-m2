export interface Paginate<T> {
  collectionSize: number;
  pageSize: number;
  page: number;
  data: T;
}
