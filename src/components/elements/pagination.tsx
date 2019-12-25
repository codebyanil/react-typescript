import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { range as _range } from 'lodash';
import { Button } from 'antd';
import FlexBox from './FlexBox';
import { Pagination as PaginationObj } from '../../types';

interface Props {
  pagination: PaginationObj;
  visibleLength?: number;
  reload(payload: { page?: number, perPage?: number }): void;
}

const Pagination = ({ pagination, visibleLength = 0, reload }: Props) => {
  const [offset, setOffset] = useState(0);
  const [perPages] = useState([5, 15, 25, 50, 100]);
  const [pages, setPages] = useState<Array<number>>([]);
  const [length, setPaginationLength] = useState(1);
  const [current, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const generatePagination = useCallback(() => {
    let startPoint = current - offset;
    if (startPoint < 1) startPoint = 1;
    let endPoint = startPoint + visibleLength;
    if (endPoint > length) {
      endPoint = length + 1;
      startPoint = endPoint - visibleLength;
      if (startPoint < 1) startPoint = 1;
    }
    setPages(_range(startPoint, endPoint));
  }, [current, length, offset, visibleLength]);

  function isPreviousable() {
    return current > 1;
  }

  function isNextable() {
    return length > current;
  }

  function setCurrent(page: number) {
    let currentPage = page;
    if (page <= 1) {
      currentPage = 1;
    } else if (page >= length) {
      currentPage = length;
    }
    if (currentPage === current) return;
    reload({ page, perPage });
  }

  function handlePerPageChange(e: ChangeEvent) {
    const value = Number(e.target.nodeValue);
    if (value) {
      setPerPage(value);
      reload({ perPage: value });
    }
  }

  useEffect(() => {
    setPerPage(pagination.current);
    setCurrentPage(pagination.perPage);
    setPaginationLength(pagination.pages);
    const middlePoint = Math.ceil(visibleLength / 2) + (!(visibleLength % 2) ? 1 : 0);
    setOffset(visibleLength - (visibleLength - middlePoint + 1));
    generatePagination();
  }, [generatePagination, length, pagination, visibleLength]);
  return (
    <FlexBox
      direction="row"
      alignItems="center"
      justifyContent="between"
    >
      <div
        className="p-2"
      >
        {pagination.message}
      </div>
      {/* per page dropdown */}
      <select
        value={perPage}
        onChange={handlePerPageChange}
      >
        {
          perPages.map((page) => {
            return (
              <option value={page}>{page}</option>
            );
          })
        }
      </select>
      <nav className="ml-3">
        <ul className="pagination disable-user-select mb-0">
          <li>
            <Button
              className={`page-item ${isPreviousable() ? '' : 'disabled'}`}
              onClick={() => setCurrent(current - 1)}
            >
              <span className="page-link">Previous</span>
            </Button>
          </li>
          {
            pages.map((page) => {
              return (
                <li key={page}>
                  <Button
                    className="page-link btn-primary"
                    onClick={() => setCurrent(page)}
                  >
                    {page}
                  </Button>
                </li>
              );
            })
          }
          <li>
            <Button
              className={`page-item ${isNextable() ? '' : 'disabled'}`}
              onClick={() => setCurrent(current + 1)}
            >
              <span className="page-link">Next</span>
            </Button>
          </li>
        </ul>
      </nav>
    </FlexBox>
  );
};
export default Pagination;
