"use client";

import { Bug } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarLinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <>
      {" "}
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
    </>
  );
};

export default NavbarLinks;
