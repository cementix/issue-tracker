import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";

const OrganizationsPage = () => {
  return (
    <div>
      <Link href="/organizations/new">
        <Button variant="solid">
          <div className="flex items-center text-lg gap-2">
            <CiCirclePlus /> New organization
          </div>
        </Button>
      </Link>
    </div>
  );
};

export default OrganizationsPage;
