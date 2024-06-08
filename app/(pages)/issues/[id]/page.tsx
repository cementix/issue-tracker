import prisma from "@/lib/db";
import { notFound } from "next/navigation";

import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

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
    <main className="grid md:grid-cols-2 grid-cols-1 gap-5">
      <IssueDetails issue={issue} />
      <EditIssueButton issueId={issue.id} />
    </main>
  );
};

export default IssuePage;
