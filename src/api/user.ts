import request from '../library/request';

export function updateProfile(data: object) {
  return request({
    url: 'users/update-profile',
    method: 'patch',
    data,
  });
}
