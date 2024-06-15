import { Button } from "@/components/ui/button";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueActions = () => {
  return (
    <div className="flex gap-3">
      <IssueStatusFilter />
      <Link href="/issues/new">
        <Button className="text-white font-bold">Create new issue</Button>
      </Link>
    </div>
  );
};

export default IssueActions;
