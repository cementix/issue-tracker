import prisma from "@/lib/db";
import { notFound } from "next/navigation";

import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

const IssuePage = async ({ params }: { params: { id: string } }) => {
  if (typeof params.id !== "string") notFound();

  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!issue) notFound();

  return (
    <main className="grid md:grid-cols-2 grid-cols-1 gap-5">
      <IssueDetails issue={issue} />
      <div className="flex gap-3 flex-col">
        <EditIssueButton issueId={issue.id} />
        <DeleteIssueButton issueId={issue.id} />
      </div>
    </main>
  );
};

export default IssuePage;
