import NavBarLink from "./NavBarLink";

export default function NavBarLinkList() {
  return (
    <ul
      className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg
    md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 justify-center content-center"
    >
      <NavBarLink name="Рецепты" />
      <NavBarLink name="Продукты" />
      <NavBarLink name="Разделы" />
      <NavBarLink name="Калькулятор питания" />
    </ul>
  );
}
