"use client";

import Link from "next/link";
import { Bug } from "lucide-react";
import { ThemeToggle } from "../theme/ThemeToggle";
import { usePathname } from "next/navigation";

type NavbarProps = {};

const Navbar = (props: NavbarProps) => {
  const currentPath = usePathname();
  console.log(currentPath);
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 p-3 border-b justify-between">
      <div className="flex items-center gap-8">
        <Bug size={30} className="text-secondary" />
        <ul className="flex text-xl gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                link.href === currentPath ? "text-secondary-muted" : ""
              } hover:text-secondary`}
            >
              {link.label}
            </Link>
          ))}
        </ul>
      </div>
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
