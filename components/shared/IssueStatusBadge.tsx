import { IssueStatus } from "@prisma/client";
import React from "react";
import { Badge } from "@/components/ui/badge";

const statusMap: Record<IssueStatus, { label: string; color: string }> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In progress", color: "yellow" },
  CLOSED: { label: "Closed", color: "green" },
};

type IssueStatusBadgeType = {
  status: IssueStatus;
  className?: string;
};

const IssueStatusBadge = ({ status, className }: IssueStatusBadgeType) => {
  const badgeColor = statusMap[status].color;
  return (
    <Badge
      className={`${className} bg-${badgeColor}-600 hover:bg-${badgeColor}-300`}
    >
      {statusMap[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
