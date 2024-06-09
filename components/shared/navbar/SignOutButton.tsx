import { LogOutIcon } from "lucide-react";
import Link from "next/link";

const SignOutButton = () => {
  return (
    <Link
      href="/api/auth/signout"
      className="flex items-center justify-center gap-2 w-[150px] rounded-xl hover:text-primary hover:underline"
    >
      Sign Out
      <LogOutIcon height={16} width={16} />
    </Link>
  );
};

export default SignOutButton;
