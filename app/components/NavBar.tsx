"use client";

import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex gap-5 p-4 items-center text-xl">
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
    </nav>
  );
};

export default NavBar;
