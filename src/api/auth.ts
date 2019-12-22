import request from '../library/request';

export function login(data: object) {
  return request({
    url: 'auth/login',
    method: 'post',
    data,
  });
}

export function registerUser(data: object) {
  return request({
    url: 'auth/register',
    method: 'post',
    data,
  });
}

export function fetchUserMeta(params: { cancelPrevious: boolean }) {
  return request({
    url: 'auth/user-meta',
    method: 'get',
    params,
    cancelPrevious: params.cancelPrevious || true,
  });
}

export function logout() {
  return request({
    url: 'auth/logout',
    method: 'get',
  });
}

export function changePassword(id: number, data: object) {
  return request({
    url: 'auth/update-password',
    method: 'patch',
    data,
  });
}
