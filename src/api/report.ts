import request from '../library/request';

export function aggregate() {
  return request({
    url: 'reports/aggregate',
    method: 'get',
  });
}
