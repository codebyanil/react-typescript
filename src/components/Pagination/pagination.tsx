import React from 'react';

interface Props{
  handlePager:any,
  meta:any,
  links:any
}

const Pagination = ({ handlePager, meta, links }:Props) => {
  return (
    <div>
      <div className=" d-flex justify-content-start">
        <label
          className="mr-2"
        >
          Page
          {meta.current_page}
          of
          {meta.last_page}
        </label>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination pagination-sm justify-content-end">
          <li
            className={links.prev === null ? 'page-item disabled' : 'page-item'}>
            <a
              className="page-link"
              onClick={handlePager}
              href={links.prev}
            >
              Previous
            </a>
          </li>
          <li className="page-item active">
            <a
              className="page-link"
              onClick={handlePager}
              href={meta.current_page}
            >
              {meta.current_page}
              <span
                className="sr-only"
              >
(current)
              </span>
            </a>
          </li>
          <li
            className={links.next === null ? 'page-item disabled' : 'page-item'}>
            <a
              className="page-link"
              onClick={handlePager}
              href={links.next}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Pagination;
