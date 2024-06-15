import { Card, CardContent, CardHeader } from "@/components/ui/card";
import prisma from "@/lib/db";

import IssueStatusBadge from "@/components/shared/navbar/IssueStatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 9,
    include: {
      assignedTo: true,
    },
  });

  return (
    <Card>
      <CardHeader className="text-xl font-bold ml-2">Latest issues</CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell className="flex justify-between">
                  <div className="flex flex-col items-start">
                    <Link
                      href={`/issues/${issue.id}`}
                      className="hover:underline"
                    >
                      {issue.title}
                    </Link>
                    <IssueStatusBadge status={issue.status} />
                  </div>
                  {issue.assignedTo && (
                    <Avatar>
                      <AvatarImage src={issue.assignedTo.image!} />
                      <AvatarFallback>?</AvatarFallback>
                    </Avatar>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LatestIssues;
