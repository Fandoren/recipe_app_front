import { Button } from "../ui/button";
import NavBarHamburger from "./NavBarHamburger";
import NavBarLinkList from "./NavBarLinkList";
import NavBarLogo from "./NavBarLogo";

export default function NavBar() {
  return (
    <nav className="bg-primary">
      <div className="grid grid-cols-12 p-4">
        <NavBarLogo></NavBarLogo>
        <NavBarHamburger></NavBarHamburger>
        <div className="hidden md:block col-span-8" id="navbar-default">
          <NavBarLinkList></NavBarLinkList>
        </div>
        <div className="col-span-1">
          <Button>Личный кабинет</Button>
        </div>
      </div>
    </nav>
  );
}
