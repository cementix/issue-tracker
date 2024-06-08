import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";

const EditIssuePage = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
