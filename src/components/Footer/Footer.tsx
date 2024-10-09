import FooterPages from "./FooterPages";
import FooterSocial from "./FooterSocial";

export default function Footer() {
  return (
    <footer className="bg-primary">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="flex flex-col md:flex-row md:justify-around">
          <div className="mb-6 md:mb-0 text-center md:text-start">
            <span className="self-center text-2xl font-semibold text-primary-foreground">
              Рецептовик
            </span>
          </div>
          <FooterPages />
          <FooterSocial />
        </div>
      </div>
    </footer>
  );
}
