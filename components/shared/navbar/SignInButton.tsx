import { LogInIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";

const SignInButton = () => {
  return (
    <Button variant="outline">
      <Link
        href="/api/auth/signin"
        className="flex items-center justify-center gap-2  rounded-xl hover:text-primary hover:underline"
      >
        Sign In
        <LogInIcon height={16} width={16} />
      </Link>
    </Button>
  );
};

export default SignInButton;
