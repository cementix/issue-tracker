import { ThemeToggle } from "../../theme/ThemeToggle";
import AuthManagement from "./AuthManagement";
import NavbarLinks from "./NavbarLinks";

const Navbar = () => {
  return (
    <nav className="flex space-x-6 p-3 border-b justify-between">
      <div className="flex items-center gap-8  mx-4">
        <NavbarLinks />
      </div>
      <div className="flex items-center gap-7">
        <AuthManagement />
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
