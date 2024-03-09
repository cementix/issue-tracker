import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";

const IssuesPage = () => {
  return (
    <div>
      <Link href="/issues/new">
        <Button variant="solid">
          <div className="flex items-center text-lg gap-2">
            <CiCirclePlus /> New issue
          </div>
        </Button>
      </Link>
    </div>
  );
};

export default IssuesPage;
