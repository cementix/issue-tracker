import IssueStatusBadge from "@/components/shared/IssueStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/db";
import Link from "next/link";
import IssueActions from "./IssueActions";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <main>
      <IssueActions />
      <Table className="max-w-[1000px]">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead className="hidden md:table-cell">Posted</TableHead>
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
                {issue.createdAt.toDateString()}
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
