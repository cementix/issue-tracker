import IssueStatusBadge from "@/components/shared/navbar/IssueStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/db";
import { Issue, IssueStatus } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import Link from "next/link";
import IssueActions from "./IssueActions";
import Pagination from "./Pagination";

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Posted", value: "createdAt", className: "hidden md:table-cell" },
  { label: "Updated", value: "updatedAt", className: "hidden md:table-cell" },
];

const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: {
    status: IssueStatus;
    orderBy: keyof Issue;
    orderDirection: "asc" | "desc";
    page: string;
  };
}) => {
  const statuses = Object.values(IssueStatus);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const sortOrderDirection =
    searchParams.orderDirection === "asc" ||
    searchParams.orderDirection === "desc"
      ? searchParams.orderDirection
      : "asc";

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: sortOrderDirection }
    : undefined;

  const page = parseInt(searchParams.page || "1");
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <main className="flex flex-col gap-3">
      <IssueActions />
      <Table className="max-w-[1000px]">
        <TableHeader>
          <TableRow>
            {columns.map((column) => {
              const newOrderDirection =
                searchParams.orderBy === column.value &&
                sortOrderDirection === "asc"
                  ? "desc"
                  : "asc";
              return (
                <TableHead className={column.className} key={column.value}>
                  <Link
                    href={{
                      query: {
                        ...searchParams,
                        orderBy: column.value,
                        orderDirection: newOrderDirection,
                      },
                    }}
                    className="flex gap-1 items-center"
                  >
                    {column.label}
                    {searchParams.orderBy === column.value &&
                      (searchParams.orderDirection === "asc" ? (
                        <ArrowUpIcon width={20} height={20} />
                      ) : (
                        <ArrowDownIcon width={20} height={20} />
                      ))}
                  </Link>
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell className="font-medium ">
                <Link href={`/issues/${issue.id}`}>
                  <p className="text-blue-500 hover:underline hover:text-blue-700">
                    {issue.title}
                  </p>
                  <IssueStatusBadge
                    className="table-cell max-w-fit md:hidden"
                    status={issue.status}
                  />
                </Link>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {formatDate(issue.createdAt)}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {formatDate(issue.updatedAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </main>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
