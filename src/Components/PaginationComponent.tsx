import React from "react";

import { usePagination, DOTS } from "../common/hooks/usePagination";

interface Props {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className: string;
}

export const PaginationComponent = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
}: Props) => {
  // usePagination
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (paginationRange === undefined) {
    return <></>;
  }

  if (currentPage === 0 || paginationRange.length < 2) {
    return <></>;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className="pagination-container">
      <li
        className={`pagination-item ${currentPage === 1 ? "disabled" : ""}`}
        onClick={onPrevious}
        key="left"
      >
        <div className="pagination-arrow left">&#60;</div>
      </li>
      {paginationRange.map((pageNumber) =>
        pageNumber === DOTS ? (
          <li className="pagination-item dots" key={pageNumber}>
            &#8230;
          </li>
        ) : (
          <li
            className={`pagination-item ${
              pageNumber === currentPage ? "selected" : ""
            }`}
            onClick={() => onPageChange(Number(pageNumber))}
            key={pageNumber}
          >
            {pageNumber}
          </li>
        )
      )}
      <li
        className={`pagination-item ${
          currentPage === lastPage ? "disabled" : ""
        }`}
        onClick={onNext}
        key="right"
      >
        <div className="pagination-arrow right">&#62;</div>
      </li>
    </ul>
  );
};
