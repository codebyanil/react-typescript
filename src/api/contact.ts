import request from '../library/request';
import { RequestParams } from '../types';

export function contactAdd(data: object) {
  return request({
    url: 'contacts',
    method: 'post',
    data,
  });
}

export function listContact(params: RequestParams) {
  const { cancelPrevious = true } = params;
  return request({
    url: 'contacts',
    method: 'get',
    params,
    cancelPrevious,
  });
}

export function contactUpdate(id: number, data: object) {
  return request({
    url: `contacts/${id}`,
    method: 'patch',
    data,
  });
}

export function getContact(id: number) {
  return request({
    url: `contacts/${id}`,
    method: 'get',
  });
}

export function deleteContact(id: number) {
  return request({
    url: `contacts/${id}`,
    method: 'delete',
  });
}

export function updateContactStatus(id: number, status: boolean) {
  return request({
    url: `contacts/${id}/status`,
    method: 'patch',
    data: {
      is_active: status ? 1 : 0,
    },
  });
}

export function checkPhoneNumber(phone: number) {
  return request({
    url: 'contacts/check-phone',
    method: 'get',
    params: {
      phone,
    },
    cancelPrevious: true,
  });
}
