import prisma from "@/lib/db";
import { Metadata } from "next";
import IssueChart from "./IssueChart";
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
    <main className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex flex-col gap-5">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </div>
      <LatestIssues />
    </main>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "Page dedicated for checking the summary of your issues",
};
