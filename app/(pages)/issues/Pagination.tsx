"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Loader,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

type PaginationProps = {
  itemCount: number;
  pageSize: number;
  currentPage: number;
};

const Pagination = ({ itemCount, pageSize, currentPage }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <Suspense fallback={<Loader className="animate-spin" />}>
      <div className="flex gap-2 items-center ml-3">
        <p>
          Page {currentPage} of {pageCount}
        </p>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => changePage(1)}
        >
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === pageCount}
          onClick={() => changePage(currentPage + 1)}
        >
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === pageCount}
          onClick={() => changePage(pageCount)}
        >
          <ChevronsRight />
        </Button>
      </div>
    </Suspense>
  );
};

export default Pagination;
