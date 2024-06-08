import IssueStatusBadge from "@/components/shared/IssueStatusBadge";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";

import ReactMarkdown from "react-markdown";

interface IssuePageProps {
  params: { id: string };
}

const IssuePage = async ({ params }: IssuePageProps) => {
  if (typeof params.id !== "string") notFound();

  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!issue) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold">{issue.title}</h1>
      <div className="flex gap-3 my-2">
        <IssueStatusBadge status={issue.status} />{" "}
        <p>{issue.createdAt.toDateString()}</p>
      </div>
      <Card className="max-w-[600px] prose">
        <CardContent className="py-4">
          <ReactMarkdown className="max-w-[600px]">
            {issue.description}
          </ReactMarkdown>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssuePage;
