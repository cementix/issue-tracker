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

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Posted", value: "createdAt", className: "hidden md:table-cell" },
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
  };
}) => {
  const statuses = Object.values(IssueStatus);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy: { [key in keyof Issue]?: "asc" | "desc" } = {};
  if (searchParams.orderBy) {
    orderBy[searchParams.orderBy] = searchParams.orderDirection || "asc";
  }

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
  });

  return (
    <main>
      <IssueActions />
      <Table className="max-w-[1000px]">
        <TableHeader>
          <TableRow>
            {columns.map((column) => {
              const newOrderDirection =
                searchParams.orderBy === column.value &&
                searchParams.orderDirection === "asc"
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
