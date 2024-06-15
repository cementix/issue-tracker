import prisma from "@/lib/db";
import { notFound } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { cache } from "react";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import StatusSelect from "./StatusSelect";

type IssuePageProps = {
  params: { id: string };
};

const fetchIssue = cache((issueId: string) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssuePage = async ({ params }: IssuePageProps) => {
  if (typeof params.id !== "string") notFound();

  const session = await getServerSession(authOptions);

  const issue = await fetchIssue(params.id);

  if (!issue) notFound();

  return (
    <main className="grid md:grid-cols-2 grid-cols-1 gap-5">
      <IssueDetails issue={issue} />
      <div className="flex gap-3 flex-col">
        {session && (
          <>
            <AssigneeSelect issue={issue} />
            <StatusSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </>
        )}
      </div>
    </main>
  );
};

export async function generateMetadata({ params }: IssuePageProps) {
  const issue = await fetchIssue(params.id);

  return {
    title: "Issue Tracker - " + issue?.title,
    description: "Details of issue " + issue?.title,
  };
}

export default IssuePage;
