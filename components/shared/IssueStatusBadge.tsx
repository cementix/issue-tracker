import { IssueStatus } from "@prisma/client";
import React from "react";
import { Badge } from "@/components/ui/badge";

const statusMap: Record<IssueStatus, { label: string; color: string }> = {
  OPEN: { label: "Open", color: "bg-red-600 hover:bg-red-300" },
  IN_PROGRESS: {
    label: "In progress",
    color: "bg-yellow-600 hover:bg-yellow-300",
  },
  CLOSED: { label: "Closed", color: "bg-green-600 hover:bg-green-300" },
};

type IssueStatusBadgeProps = {
  status: IssueStatus;
  className?: string;
};

const IssueStatusBadge = ({ status, className }: IssueStatusBadgeProps) => {
  const badgeColor = statusMap[status].color;
  return (
    <Badge className={`${className} ${badgeColor} text-white`}>
      {statusMap[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
