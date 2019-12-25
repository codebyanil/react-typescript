import { RequestData } from '../types';

export function getPaginationInfo(meta:RequestData) {
  const {
    from, to, total, last_page, current_page, per_page,
  } = meta;
  return {
    pages: last_page,
    current: current_page,
    perPage: parseInt(per_page, 0),
    message: total ? `Showing ${from} to ${to} of ${total} entries` : '',
  };
}
