import { Button } from "@/components/ui/button";
import Link from "next/link";

const IssueActions = () => {
  return (
    <div>
      <Link href="/issues/new">
        <Button className="text-white font-bold">Create new issue</Button>
      </Link>
    </div>
  );
};

export default IssueActions;
