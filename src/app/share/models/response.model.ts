export interface response<T> {
  data: T;
  hasData: boolean;
  isOk: boolean;
  message: string;
}
export interface Data<T> {
  data: T[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
}
