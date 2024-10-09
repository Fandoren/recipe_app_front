export default function NavBarLink(props) {
  return (
    <li>
      <a
        href="#"
        className="block py-2 px-3 text-xl text-primary-foreground font"
        aria-current="page"
      >
        {props.name}
      </a>
    </li>
  );
}
