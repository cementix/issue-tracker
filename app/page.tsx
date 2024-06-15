import prisma from "@/lib/db";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

export default async function DashboardPage() {
  const open = await prisma.issue.count({
    where: {
      status: "OPEN",
    },
  });
  const inProgress = await prisma.issue.count({
    where: {
      status: "IN_PROGRESS",
    },
  });
  const closed = await prisma.issue.count({
    where: {
      status: "CLOSED",
    },
  });
  return (
    <main className="flex flex-col gap-4">
      <LatestIssues />
      <IssueSummary open={open} inProgress={inProgress} closed={closed} />
    </main>
  );
}
