import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/db";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <main>
      {" "}
      <Link href="/issues/new">
        <Button>Create new issue</Button>
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
                <TableCell className="font-medium">
                  {issue.title}
                  <p className="block md:hidden">{issue.status}</p>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {issue.status}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Link>
    </main>
  );
};

export default IssuesPage;
