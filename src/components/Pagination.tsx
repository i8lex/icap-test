import React, { FC } from "react";
import clsx from "clsx";
import { getPaginationData } from "@/utils/paginationUtils";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/router";

type PaginationProps = {
  currentPage: number;
  countOfPages: number;
};

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  countOfPages,
}) => {
  const router = useRouter();
  const paginationData = getPaginationData(currentPage, countOfPages);
  return (
    <nav>
      <div className="flex gap-2 justify-center">
        {paginationData.items.map((pageNumber, index) => (
          <div className="inline-block" key={index}>
            {pageNumber !== "..." ? (
              <Button
                size="sm"
                variant="yellow"
                key={index}
                text={pageNumber}
                disabled={pageNumber === currentPage}
                className={clsx(currentPage === pageNumber ? "shadow-sm" : "")}
                onClick={() =>
                  router.push(`/table?page=${pageNumber}`).finally()
                }
              />
            ) : (
              <div className=" p-2 block text-center cursor-default text-base">
                {pageNumber}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};
