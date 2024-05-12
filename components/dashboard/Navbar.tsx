import Link from "next/link";
import { Bug } from "lucide-react";
import { ThemeToggle } from "../theme/ThemeToggle";

type NavbarProps = {};

const Navbar = (props: NavbarProps) => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex items-center space-x-6 p-3 border-b">
      <Bug size={25} />
      <ul className="flex text-xl space-x-6">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </ul>
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
