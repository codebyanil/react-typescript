export interface RequestData {
  message?: string;
  errors?: []

  [key: string]: any;
}

export interface RequestList extends RequestData {
  data: [];
  meta: {};
  links:{};
}

export interface RequestError {
  errors?: [];
}

export interface RequestParams {
  [key: string]: any;
}

export interface Contact {
  id: number | string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dob: Date;
  description: string;
}

export interface Story {
  id: number | string;
  title: string;
  address: string;
  date: Date;
  description: string;
}

export interface Pagination {
  current: number;
  pages: number;
  message: string;
  perPage: number;
}
