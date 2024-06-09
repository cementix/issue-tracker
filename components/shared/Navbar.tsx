"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bug } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../theme/ThemeToggle";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";

type NavbarProps = {};

const Navbar = (props: NavbarProps) => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  const { status, data: session } = useSession();

  return (
    <nav className="flex space-x-6 p-3 border-b justify-between">
      <div className="flex items-center gap-8  mx-4">
        <Bug size={30} className="text-foreground" />
        <ul className="flex text-xl gap-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${
                  link.href === currentPath ? "text-primary" : ""
                } hover:text-primary duration-100 text-foreground font-medium`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-7">
        {status === "authenticated" && (
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage src={session.user!.image!} />
                <AvatarFallback>?</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col items-center w-fit">
              <p className="text-gray-500 text-sm">{session.user!.email!}</p>
              <SignOutButton />
            </PopoverContent>
          </Popover>
        )}
        {status === "unauthenticated" && <SignInButton />}
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
