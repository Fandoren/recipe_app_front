export default function FooterPages() {
  return (
    <div className="col-start-4 col-span-2 mx-10">
      <ul className="text-primary-foreground text-center md:text-start">
        <li className="mb-2">
          <a href="#" className="text-xl hover:text-darkblue">
            Рецепты
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="text-xl hover:text-darkblue">
            Продукты
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="text-xl hover:text-darkblue">
            Разделы
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="text-xl hover:text-darkblue">
            Калькулятор питания
          </a>
        </li>
        <li className="mb-2">
          <a href="#" className="text-xl hover:text-darkblue">
            Личный кабинет
          </a>
        </li>
      </ul>
    </div>
  );
}
