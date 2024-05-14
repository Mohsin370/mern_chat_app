import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <nav>
        <div className="flex flex-wrap justify-between items-center px-4">
          <Link to="/" className="text-5xl font-gilroy-bold cursor-pointer text-secondary md:m-0 m-auto mt-10 mb-16">Ping</Link>
          <ul className=" hidden md:flex flex-col mt-4 md:flex-row md:space-x-8 ">
            <li>
              <Link to="/login" className=" cursor-pointer">
                Login
              </Link>
            </li>
            <li>
              <Link target="blank" to="https://github.com/Mohsin370">Contact Me</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
