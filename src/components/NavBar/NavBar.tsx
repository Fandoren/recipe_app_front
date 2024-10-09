import NavBarHamburger from "./NavBarHamburger";
import NavBarLinkList from "./NavBarLinkList";
import NavBarLogo from "./NavBarLogo";

export default function NavBar() {
  return (
    <nav className="bg-primary">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <NavBarLogo></NavBarLogo>
        <NavBarHamburger></NavBarHamburger>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <NavBarLinkList></NavBarLinkList>
        </div>
      </div>
    </nav>
  );
}
