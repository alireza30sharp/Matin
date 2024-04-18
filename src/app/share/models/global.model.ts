export interface Default<T> {
  statusCode: number;
  message: string;
  data: T;
}

export class FilterRequest {
  filters?: string;
  sorts?: string;
  page: number = 1;
  pageSize: number = 500;
}

export interface User {
  avatar: string;
  displayName: string;
  id: number;
  introducerId: number;
  isActive: boolean;
  isDeleted: boolean;
  lastLocation: string;
  lastLocationDate: string;
  lastLoginDate: string;
  lastOnlineDate: string;
  registerDate: string;
  roles: string;
  username: string;
}

export interface Location {
  lat: number;
  long: number;
}
