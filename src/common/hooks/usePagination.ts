import { useMemo } from "react";

import { IPagination } from "../PaginationInterface";

const range = (start: number, end: number) => {
    let length = end - start + 1;
    /*
    Create an array of certain length and set 
    the elements within it from start value to end value.
    */
    return Array.from({ length }, (_, idx) => idx + start);

};

export const DOTS = '...';

export const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage
}: IPagination) => {
    const paginationRange = useMemo(() => {
        // calculate the total pages
        const totalPageCount = Math.ceil(totalCount / pageSize);

        // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
        const totalPageNumbers = siblingCount + 5;

        /* Case 1:
            If the number of pages is less than the page numbers we want to show in our
            paginationComponent, we return the range [1..totalPageCount]
        */
        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        /* Case 2: 
            No left dots to show, but rights dots to be shown
        */
        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, totalPageCount];
        }

        /* Case 3:
            No right dots to show, but left dots to be shown
        */
        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);

            return [firstPageIndex, DOTS, ...rightRange];
        }

        /* Case 4:
            Both left and right dots to be shown
        */
        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }
    }, [totalCount, pageSize, siblingCount, currentPage]);

    return paginationRange;
};