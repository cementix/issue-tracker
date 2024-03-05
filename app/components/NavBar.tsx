import Link from "next/link";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
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
            className="text-zinc-500 hover:text-black transition-colors"
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
