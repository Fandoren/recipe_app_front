export default function NavBarHamburger() {
  return (
    <button
      data-collapse-toggle="navbar-default"
      type="button"
      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm 
      text-primary-foreground rounded-lg md:hidden hover:bg-darkblue
      focus:outline-none focus:ring-2 focus:bg-secondary focus:text-darkblue"
      aria-controls="navbar-default"
      aria-expanded="false"
    >
      <span className="sr-only">Открыть меню</span>
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>
    </button>
  );
}
