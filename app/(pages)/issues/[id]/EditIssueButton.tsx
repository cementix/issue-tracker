import { Button } from "@/components/ui/button";
import { SquarePenIcon } from "lucide-react";
import Link from "next/link";

const EditIssueButton = ({ issueId }: { issueId: string }) => {
  return (
    <Button size="lg" className="text-white font-bold max-w-fit">
      <Link
        href={`/issues/${issueId}/edit`}
        className="flex gap-2 items-center text-lg"
      >
        Edit Issue <SquarePenIcon />
      </Link>
    </Button>
  );
};

export default EditIssueButton;
