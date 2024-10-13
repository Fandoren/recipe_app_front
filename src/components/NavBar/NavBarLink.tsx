interface NavBarLink {
  name: string;
}

export default function NavBarLink(props: NavBarLink) {
  return (
    <li>
      <a
        href="#"
        className="block py-2 px-3 text-xl text-primary-foreground hover:text-darkblue"
        aria-current="page"
      >
        {props.name}
      </a>
    </li>
  );
}
