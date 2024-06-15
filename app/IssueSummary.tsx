import { Card, CardContent } from "@/components/ui/card";
import { IssueStatus } from "@prisma/client";
import Link from "next/link";

type IssueSummaryProps = {
  open: number;
  inProgress: number;
  closed: number;
};
const IssueSummary = ({ open, inProgress, closed }: IssueSummaryProps) => {
  const containers: { label: string; value: number; status: IssueStatus }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In-progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];
  return (
    <div className="flex gap-5">
      {containers.map((container) => (
        <Card key={container.status}>
          <CardContent className="flex flex-col gap-2 justify-center font-medium pt-4 text-sm">
            <Link href={`/issues?status=${container.status}`}>
              {container.label}
            </Link>
            <p className="font-bold text-xl">{container.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default IssueSummary;
