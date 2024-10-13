import FooterPages from "./FooterPages";
import FooterSocial from "./FooterSocial";

export default function Footer() {
  return (
    <footer className="bg-primary">
      <div className="grid grid-cols-12 px-4 py-8">
        <div className="col-span-2 text-center">
          <span className="text-4xl font-semibold whitespace-nowrap text-primary-foreground">
            Рецептовик
          </span>
        </div>
        <FooterPages />
        <FooterSocial />
      </div>
    </footer>
  );
}
