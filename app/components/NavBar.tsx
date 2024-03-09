"use client";

import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { Button, Separator } from "@radix-ui/themes";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { FaUser } from "react-icons/fa";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav>
      <div className="flex gap-5 p-4 justify-around items-center text-xl">
        <div className="flex items-center gap-5">
          <Link href="/">
            <AiFillBug />
          </Link>
          <ul className="flex gap-5">
            {links.map((link) => (
              <li
                className={classNames({
                  "text-zinc-900": currentPath == link.href,
                  "text-zinc-500": currentPath !== link.href,
                  "hover:text-zinc-900": true,
                })}
                key={link.href}
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <SignedIn>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <Link href="/sign-in">
            <Button>
              <div className="flex items-center gap-3">
                <FaUser /> Sign In
              </div>
            </Button>
          </Link>
        </SignedOut>
      </div>
      <Separator size="4" />
    </nav>
  );
};

export default NavBar;
