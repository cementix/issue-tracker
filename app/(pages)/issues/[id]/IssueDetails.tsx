"use client";

import IssueStatusBadge from "@/components/shared/navbar/IssueStatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Issue } from "@prisma/client";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{issue.title}</h1>
      <div className="flex gap-3 text-xl my-2">
        <IssueStatusBadge status={issue.status} />{" "}
        <p>{issue.createdAt.toDateString()}</p>
      </div>
      <Card className="max-w-[2000px] w-full prose text-xl">
        <CardContent className="py-4">
          <ReactMarkdown className="max-w-[800px]">
            {issue.description}
          </ReactMarkdown>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssueDetails;
