import { Badge } from "@/components/ui/badge";
import { IssueStatus } from "@prisma/client";

const statusMap: Record<IssueStatus, { label: string; color: string }> = {
  OPEN: { label: "Open", color: "bg-rose-100 hover:bg-rose-50 text-rose-800" },
  IN_PROGRESS: {
    label: "In progress",
    color: "bg-violet-200 hover:bg-violet-100 text-violet-800",
  },
  CLOSED: {
    label: "Closed",
    color: "bg-green-100 hover:bg-green-50 text-green-800",
  },
};

type IssueStatusBadgeProps = {
  status: IssueStatus;
  className?: string;
};

const IssueStatusBadge = ({ status, className }: IssueStatusBadgeProps) => {
  const badgeColor = statusMap[status].color;
  return (
    <Badge className={`${className} ${badgeColor} rounded-md`}>
      {statusMap[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
